import dotenv from "dotenv";
import { conn } from "./db.mjs";

dotenv.config();

export const initialDatabase = async () => {
    try {
        const checkSql = `
          SELECT id 
          FROM users 
          LIMIT 1
        `;
        await conn.query(checkSql)
        return "Database has been initial already."
    } catch (err) {
        const seedSql = `
        create table users
(
    id         serial
        primary key,
    username   varchar(50)  not null
        unique,
    first_name varchar(100),
    last_name  varchar(100),
    email      varchar(150) not null
        unique,
    password   varchar(255) not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    image      varchar(255)
);

alter table users
    owner to postgres;

create trigger update_users_updated_at
    before update
    on users
    for each row
execute procedure update_updated_at_column();

create table wallets
(
    id             serial
        primary key,
    user_id        integer      not null
        constraint fk_wallets_user
            references users
            on delete cascade,
    account_number varchar(50)  not null,
    bank_name      varchar(100) not null,
    created_at     timestamp default CURRENT_TIMESTAMP,
    updated_at     timestamp default CURRENT_TIMESTAMP
);

alter table wallets
    owner to postgres;

create table activities
(
    id          serial
        primary key,
    name        varchar(255) not null,
    start_date  date         not null,
    end_date    date         not null,
    description text,
    location    varchar(255) not null,
    wallet_id   integer
        constraint fk_activities_wallet
            references wallets
            on delete set null,
    budget      numeric(12, 2),
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP,
    user_id     integer
        constraint fk_activities_user
            references users
            on delete cascade,
    image       varchar(255)
);

alter table activities
    owner to postgres;

create table activity_members
(
    activity_id integer not null
        constraint fk_activity
            references activities
            on delete cascade,
    user_id     integer not null
        constraint fk_activity_user
            references users
            on delete cascade,
    role        varchar(20)
        constraint activity_members_role_check
            check ((role)::text = ANY ((ARRAY ['creator'::character varying, 'member'::character varying])::text[])),
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP,
    primary key (activity_id, user_id)
);

alter table activity_members
    owner to postgres;

create table friendships
(
    id           serial
        primary key,
    requester_id integer not null
        constraint fk_requester
            references users
            on delete cascade,
    receiver_id  integer not null
        constraint fk_receiver
            references users
            on delete cascade,
    status       friend_status_enum default 'Pending'::friend_status_enum,
    created_at   timestamp          default CURRENT_TIMESTAMP,
    updated_at   timestamp          default CURRENT_TIMESTAMP,
    constraint unique_friend_request
        unique (requester_id, receiver_id)
);

alter table friendships
    owner to postgres;

create table payments
(
    id          serial
        primary key,
    user_id     serial
        references users,
    activity_id serial
        references activities,
    amount      numeric(10, 2),
    paid_at     timestamp,
    slip_url    text,
    note        text,
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP
);

alter table payments
    owner to postgres;
        `
        await conn.query(seedSql)
        return "Initial Database Successful"
    }
}

