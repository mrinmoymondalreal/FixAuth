create table if not exists users (
  id serial primary key,
  name varchar(25),
  password varchar(50) not null,
  email varchar(50),
  username varchar(20) not null
);

create table if not exists tokens (
  id serial primary key,
  token varchar(50) not null,
  tkn TEXT not null
);