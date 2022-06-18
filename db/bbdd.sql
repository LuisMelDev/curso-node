CREATE TABLE IF NOT EXISTS public.auth_user
(
    id integer NOT NULL DEFAULT nextval('auth_user_id_seq'::regclass),
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    CONSTRAINT auth_user_pkey PRIMARY KEY (id),
    CONSTRAINT auth_user_password_key UNIQUE (password)
);

CREATE TABLE IF NOT EXISTS public.wallet_balance
(
    id integer NOT NULL,
    user_id integer NOT NULL,
    amount numeric(10, 2) NOT NULL,
    created_at date,
    updated_at date,
    CONSTRAINT wallet_balance_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.wallet_movement
(
    id integer NOT NULL,
    user_id integer NOT NULL,
    type smallint NOT NULL,
    amount numeric(10, 2) NOT NULL,
    created_at date,
    updated_at date,
    CONSTRAINT wallet_movement_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.wallet_subscription
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer NOT NULL,
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    amount numeric(10, 2) NOT NULL,
    cron character varying(50) COLLATE pg_catalog."default" NOT NULL,
    created_at date,
    updated_at date,
    CONSTRAINT wallet_subscription_pkey PRIMARY KEY (id)
);