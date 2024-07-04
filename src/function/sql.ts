import postgres from "postgres"

export const sql = postgres(process.env.URI)

/*
create table if not exists users (
    id UUID primary key not null default gen_random_uuid(),
    username varchar(20) not null check (length(username) between 5 and 20),
    email text not null,
    password char(65) not null check (length(password) = 65)
)

create table if not exists todo (
    id UUID primary key not null default gen_random_uuid(),
    users uuid references users(id) not null,
    title text not null,
    description text not null,
    status boolean default false
)
*/
