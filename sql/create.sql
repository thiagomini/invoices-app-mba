create table contract(
  id_contract uuid not null default gen_random_uuid() primary key,
  description text,
  amount numeric,
  periods integer,
  date timestamp
);

create table payment(
  id_payment uuid not null default gen_random_uuid() primary key,
  id_contract uuid not null,
  amount numeric,
  date timestamp,
  foreign key (id_contract) references contract(id_contract)
);

insert into contract VALUES ('e4192773-5324-4f8a-b178-c9d167a4a6da', 'A Contract', 6000, 12, '2021-01-01');

insert into payment VALUES ('759227c4-148d-4da7-b0a8-abad1cd30195', 'e4192773-5324-4f8a-b178-c9d167a4a6da', 500, '2021-01-01');
 