SET search_path = score, pg_catalog;

CREATE TABLE mark (
    mark_id uuid NOT NULL,
    user_id uuid
);

CREATE TABLE users (
    user_id uuid NOT NULL,
    email text,
    score integer,
    admin boolean,
    active boolean
 );


CREATE TABLE vote (
    mark_id uuid,
    user_id uuid,
    is_good boolean
);
