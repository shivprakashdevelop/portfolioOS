create extension if not exists "pgcrypto";

create table if not exists profiles (id uuid primary key references auth.users(id) on delete cascade, display_name text, base_currency text not null default 'INR', created_at timestamptz not null default now());
create table if not exists portfolios (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, base_currency text not null default 'INR', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists sleeves (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, name text not null, description text, target_weight numeric not null default 0 check (target_weight >= 0), sleeve_type text not null default 'custom', color text not null default '#55775b', sort_order int not null default 0, archived boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists holdings (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, sleeve_id uuid not null references sleeves(id), name text not null, ticker text, asset_type text not null default 'equity', currency text not null default 'INR', quantity numeric not null default 0, average_price numeric not null default 0, manual_current_price numeric, geography text, sector text, industry text, market_cap text, target_weight_in_sleeve numeric not null default 0 check (target_weight_in_sleeve >= 0), thesis text, notes text, active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table if not exists holding_themes (holding_id uuid not null references holdings(id) on delete cascade, theme text not null, primary key (holding_id, theme));
create table if not exists transactions (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, holding_id uuid references holdings(id) on delete set null, transaction_type text not null check (transaction_type in ('BUY','SELL','DIVIDEND','DEPOSIT','WITHDRAWAL','INTEREST','FEE')), transaction_date date not null, quantity numeric not null default 0, price numeric not null default 0, amount numeric not null default 0, currency text not null default 'INR', fees numeric not null default 0, notes text, created_at timestamptz not null default now());
create table if not exists exchange_rates (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, from_currency text not null, to_currency text not null, rate numeric not null check (rate > 0), rate_date date not null, unique (portfolio_id, from_currency, to_currency, rate_date));
create table if not exists portfolio_rules (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, name text not null, metric text not null, operator text not null, threshold numeric not null, severity text not null default 'warning', enabled boolean not null default true);
create table if not exists model_portfolios (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, name text not null, description text, updated_at timestamptz not null default now());
create table if not exists model_targets (id uuid primary key default gen_random_uuid(), model_portfolio_id uuid not null references model_portfolios(id) on delete cascade, holding_id uuid references holdings(id) on delete set null, target_weight numeric not null default 0, effective_from date not null default current_date);
create table if not exists portfolio_reviews (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, review_date date not null, notes text, created_at timestamptz not null default now());
create table if not exists rebalance_records (id uuid primary key default gen_random_uuid(), portfolio_id uuid not null references portfolios(id) on delete cascade, rebalance_type text not null, amount numeric not null default 0, currency text not null default 'INR', created_at timestamptz not null default now(), notes text);
create table if not exists rebalance_actions (id uuid primary key default gen_random_uuid(), rebalance_record_id uuid not null references rebalance_records(id) on delete cascade, holding_id uuid references holdings(id) on delete set null, action text not null, amount numeric not null default 0, currency text not null default 'INR');

alter table profiles enable row level security;
alter table portfolios enable row level security;
alter table sleeves enable row level security;
alter table holdings enable row level security;
alter table transactions enable row level security;
alter table exchange_rates enable row level security;
alter table portfolio_rules enable row level security;
alter table model_portfolios enable row level security;
alter table model_targets enable row level security;
alter table portfolio_reviews enable row level security;
alter table rebalance_records enable row level security;
alter table rebalance_actions enable row level security;

create policy "users manage own profiles" on profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy "users manage own portfolios" on portfolios for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "users manage portfolio sleeves" on sleeves for all using (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid())) with check (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid()));
create policy "users manage portfolio holdings" on holdings for all using (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid())) with check (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid()));
create policy "users manage portfolio transactions" on transactions for all using (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid())) with check (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid()));
create policy "users manage portfolio rates" on exchange_rates for all using (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid())) with check (exists (select 1 from portfolios p where p.id = portfolio_id and p.user_id = auth.uid()));
