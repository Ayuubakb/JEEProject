--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2024-10-30 16:14:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 862 (class 1247 OID 16390)
-- Name: city; Type: TYPE; Schema: public; Owner: postgres
--

\c JEEproject

CREATE TYPE public.city AS ENUM (
    'tanger',
    'tetouan',
    'casablanca',
    'rabat',
    'fes',
    'marrakech',
    'agadir',
    'oujda'
);


ALTER TYPE public.city OWNER TO postgres;

--
-- TOC entry 865 (class 1247 OID 16408)
-- Name: driver_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.driver_type AS ENUM (
    'car',
    'truck'
);


ALTER TYPE public.driver_type OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 16414)
-- Name: mission_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.mission_type AS ENUM (
    'inter city',
    'inter agency'
);


ALTER TYPE public.mission_type OWNER TO postgres;

--
-- TOC entry 871 (class 1247 OID 16420)
-- Name: order_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_type AS ENUM (
    'normal',
    'express'
);


ALTER TYPE public.order_type OWNER TO postgres;

--
-- TOC entry 874 (class 1247 OID 16426)
-- Name: receiver_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.receiver_type AS ENUM (
    'client',
    'firm'
);


ALTER TYPE public.receiver_type OWNER TO postgres;

--
-- TOC entry 877 (class 1247 OID 16432)
-- Name: role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role AS ENUM (
    'admin',
    'driver',
    'client'
);


ALTER TYPE public.role OWNER TO postgres;

--
-- TOC entry 880 (class 1247 OID 16440)
-- Name: tracking_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tracking_status AS ENUM (
    'pending',
    'collection',
    'being shipped',
    'being delivered'
);


ALTER TYPE public.tracking_status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16449)
-- Name: agencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencies (
    id_agency integer NOT NULL,
    city character varying(255),
    address character varying(255) NOT NULL
);


ALTER TABLE public.agencies OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16454)
-- Name: agencies_id_agency_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencies_id_agency_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agencies_id_agency_seq OWNER TO postgres;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 218
-- Name: agencies_id_agency_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencies_id_agency_seq OWNED BY public.agencies.id_agency;


--
-- TOC entry 219 (class 1259 OID 16455)
-- Name: banks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banks (
    id_bank integer NOT NULL,
    number integer NOT NULL,
    cardnum integer NOT NULL,
    cvv integer NOT NULL,
    expiry_y integer NOT NULL,
    expiry_m integer NOT NULL,
    balance real
);


ALTER TABLE public.banks OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16458)
-- Name: banks_id_bank_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banks_id_bank_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.banks_id_bank_seq OWNER TO postgres;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 220
-- Name: banks_id_bank_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banks_id_bank_seq OWNED BY public.banks.id_bank;


--
-- TOC entry 221 (class 1259 OID 16459)
-- Name: mission_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mission_details (
    id_order integer NOT NULL,
    id_mission integer NOT NULL
);


ALTER TABLE public.mission_details OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16462)
-- Name: missions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missions (
    id_mission integer NOT NULL,
    is_done boolean DEFAULT false,
    mission_type character varying(255),
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    from_city character varying(255),
    to_city character varying(255),
    id_driver integer,
    id_user integer
);


ALTER TABLE public.missions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16468)
-- Name: missions_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missions_details (
    id_missiondet integer NOT NULL,
    id_oder integer,
    id_mission integer
);


ALTER TABLE public.missions_details OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16471)
-- Name: missions_details_id_missiondet_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.missions_details_id_missiondet_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.missions_details_id_missiondet_seq OWNER TO postgres;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 224
-- Name: missions_details_id_missiondet_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.missions_details_id_missiondet_seq OWNED BY public.missions_details.id_missiondet;


--
-- TOC entry 225 (class 1259 OID 16472)
-- Name: missions_id_mission_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.missions_id_mission_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.missions_id_mission_seq OWNER TO postgres;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 225
-- Name: missions_id_mission_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.missions_id_mission_seq OWNED BY public.missions.id_mission;


--
-- TOC entry 226 (class 1259 OID 16473)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id_order integer NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tracking_status character varying(255),
    order_type character varying(255),
    weight integer NOT NULL,
    price real NOT NULL,
    priority integer DEFAULT 0,
    id_driver integer,
    id_receiver integer,
    id_client integer,
    id_user integer,
    is_aborted boolean DEFAULT false
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16480)
-- Name: orders_id_order_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_order_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_order_seq OWNER TO postgres;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_order_seq OWNED BY public.orders.id_order;


--
-- TOC entry 228 (class 1259 OID 16481)
-- Name: receivers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receivers (
    id_receiver integer NOT NULL,
    fullname character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255),
    email character varying(255) NOT NULL
);


ALTER TABLE public.receivers OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16486)
-- Name: receivers_id_receiver_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receivers_id_receiver_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.receivers_id_receiver_seq OWNER TO postgres;

--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 229
-- Name: receivers_id_receiver_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receivers_id_receiver_seq OWNED BY public.receivers.id_receiver;


--
-- TOC entry 230 (class 1259 OID 16487)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id_transaction integer NOT NULL,
    amount real NOT NULL,
    receiver_type character varying(255),
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_bank integer,
    id_client integer,
    receiver smallint,
    id_user integer,
    CONSTRAINT transactions_receiver_check CHECK (((receiver >= 0) AND (receiver <= 1)))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16492)
-- Name: transactions_id_transaction_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_transaction_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_transaction_seq OWNER TO postgres;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 231
-- Name: transactions_id_transaction_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_transaction_seq OWNED BY public.transactions.id_transaction;


--
-- TOC entry 232 (class 1259 OID 16493)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role character varying(255),
    add_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    password character varying(255) NOT NULL,
    id_agency integer,
    driver_type character varying(255),
    is_available boolean,
    company character varying(255),
    balance real,
    is_active boolean DEFAULT true,
    dtype character varying(31),
    address character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16500)
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_user_seq OWNER TO postgres;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 233
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- TOC entry 3270 (class 2604 OID 16501)
-- Name: agencies id_agency; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies ALTER COLUMN id_agency SET DEFAULT nextval('public.agencies_id_agency_seq'::regclass);


--
-- TOC entry 3271 (class 2604 OID 16502)
-- Name: banks id_bank; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banks ALTER COLUMN id_bank SET DEFAULT nextval('public.banks_id_bank_seq'::regclass);


--
-- TOC entry 3272 (class 2604 OID 16503)
-- Name: missions id_mission; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions ALTER COLUMN id_mission SET DEFAULT nextval('public.missions_id_mission_seq'::regclass);


--
-- TOC entry 3274 (class 2604 OID 16504)
-- Name: missions_details id_missiondet; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details ALTER COLUMN id_missiondet SET DEFAULT nextval('public.missions_details_id_missiondet_seq'::regclass);


--
-- TOC entry 3275 (class 2604 OID 16505)
-- Name: orders id_order; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id_order SET DEFAULT nextval('public.orders_id_order_seq'::regclass);


--
-- TOC entry 3279 (class 2604 OID 16506)
-- Name: receivers id_receiver; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receivers ALTER COLUMN id_receiver SET DEFAULT nextval('public.receivers_id_receiver_seq'::regclass);


--
-- TOC entry 3280 (class 2604 OID 16507)
-- Name: transactions id_transaction; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id_transaction SET DEFAULT nextval('public.transactions_id_transaction_seq'::regclass);


--
-- TOC entry 3282 (class 2604 OID 16508)
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- TOC entry 3467 (class 0 OID 16449)
-- Dependencies: 217
-- Data for Name: agencies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencies (id_agency, city, address) FROM stdin;
3	rabat	531 Gueliz
4	marrakech	531 Gueliz
\.


--
-- TOC entry 3469 (class 0 OID 16455)
-- Dependencies: 219
-- Data for Name: banks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banks (id_bank, number, cardnum, cvv, expiry_y, expiry_m, balance) FROM stdin;
\.


--
-- TOC entry 3471 (class 0 OID 16459)
-- Dependencies: 221
-- Data for Name: mission_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mission_details (id_order, id_mission) FROM stdin;
17	24
15	24
19	24
21	24
22	24
25	24
12	24
13	24
14	25
18	25
16	25
20	25
23	25
\.


--
-- TOC entry 3472 (class 0 OID 16462)
-- Dependencies: 222
-- Data for Name: missions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missions (id_mission, is_done, mission_type, start_date, end_date, from_city, to_city, id_driver, id_user) FROM stdin;
24	f	In_City	2024-10-30 15:53:10.477	\N	2	2	11	\N
25	f	In_City	2024-10-30 15:53:21.838	\N	2	2	11	\N
\.


--
-- TOC entry 3473 (class 0 OID 16468)
-- Dependencies: 223
-- Data for Name: missions_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missions_details (id_missiondet, id_oder, id_mission) FROM stdin;
\.


--
-- TOC entry 3476 (class 0 OID 16473)
-- Dependencies: 226
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id_order, date, tracking_status, order_type, weight, price, priority, id_driver, id_receiver, id_client, id_user, is_aborted) FROM stdin;
23	2024-10-28 18:27:32.422	CollectingFromSender	Normal	18	85.6	10900	\N	1	12	\N	f
22	2024-10-28 18:27:25.487	CollectingFromSender	Express	7	310.8	32700	\N	1	12	\N	f
14	2024-10-28 18:16:10.801	CollectingFromSender	Normal	15	120.75	10948	\N	1	12	\N	f
24	2024-10-28 18:27:45.897	Shipping	Express	30	225.5	5	\N	1	12	\N	f
20	2024-10-28 18:27:08.661	CollectingFromSender	Normal	5	150.45	10904	\N	1	12	\N	f
25	2024-10-29 21:13:10.616	CollectingFromSender	Express	20	300	13428	\N	1	12	\N	f
17	2024-10-28 18:16:36.685	CollectingFromSender	Express	12	180	32832	\N	1	12	\N	f
12	2024-10-28 17:52:48.515	CollectingFromSender	Normal	15	120.75	11040	\N	1	12	\N	f
18	2024-10-28 18:16:44.959	CollectingFromSender	Normal	25	300.25	10944	\N	1	12	\N	f
15	2024-10-28 18:16:19.839	CollectingFromSender	Express	10	250.5	32832	\N	1	12	\N	f
13	2024-10-28 18:14:49.566	CollectingFromSender	Normal	15	120.75	10952	\N	1	12	\N	f
21	2024-10-28 18:27:15.725	CollectingFromSender	Express	7	310.8	32700	\N	1	12	\N	f
19	2024-10-28 18:26:58.507	CollectingFromSender	Express	8	275.9	32712	\N	1	12	\N	f
16	2024-10-28 18:16:29.076	CollectingFromSender	Normal	20	99.99	10944	\N	1	12	\N	f
\.


--
-- TOC entry 3478 (class 0 OID 16481)
-- Dependencies: 228
-- Data for Name: receivers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receivers (id_receiver, fullname, phone, address, city, email) FROM stdin;
1	John Doe	1234567890	456 Elm Street	rabat	john.doe@example.com
\.


--
-- TOC entry 3480 (class 0 OID 16487)
-- Dependencies: 230
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id_transaction, amount, receiver_type, date, id_bank, id_client, receiver, id_user) FROM stdin;
11	100	\N	2024-10-27 19:50:32.371	\N	\N	0	12
12	100	\N	2024-10-27 19:52:18.402	\N	\N	0	12
14	50	\N	\N	\N	\N	1	12
16	50	\N	2024-10-29 01:00:00	\N	\N	1	12
\.


--
-- TOC entry 3482 (class 0 OID 16493)
-- Dependencies: 232
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, first_name, last_name, email, role, add_date, password, id_agency, driver_type, is_available, company, balance, is_active, dtype, address) FROM stdin;
11	John	Doe	driver@example.com	Driver	2024-10-21 16:03:11.735	password123	3	\N	t	\N	\N	t	Driver	\N
13	abbderahim	elout	manager@example.com	Manager	2024-10-21 16:09:54.847	password123	3	\N	\N	\N	\N	t	Manager	\N
12	ayoub	akoubri	password123	Client	2024-10-21 16:09:38.739	client@example.com	3	\N	\N	test	100	t	Client	\N
\.


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 218
-- Name: agencies_id_agency_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencies_id_agency_seq', 4, true);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 220
-- Name: banks_id_bank_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banks_id_bank_seq', 1, false);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 224
-- Name: missions_details_id_missiondet_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.missions_details_id_missiondet_seq', 1, false);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 225
-- Name: missions_id_mission_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.missions_id_mission_seq', 25, true);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_order_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_order_seq', 25, true);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 229
-- Name: receivers_id_receiver_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receivers_id_receiver_seq', 1, true);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 231
-- Name: transactions_id_transaction_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_transaction_seq', 16, true);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 233
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 13, true);


--
-- TOC entry 3287 (class 2606 OID 16510)
-- Name: agencies agencies_city_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies
    ADD CONSTRAINT agencies_city_key UNIQUE (city);


--
-- TOC entry 3289 (class 2606 OID 16512)
-- Name: agencies agencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies
    ADD CONSTRAINT agencies_pkey PRIMARY KEY (id_agency);


--
-- TOC entry 3291 (class 2606 OID 16514)
-- Name: banks banks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banks
    ADD CONSTRAINT banks_pkey PRIMARY KEY (id_bank);


--
-- TOC entry 3293 (class 2606 OID 16516)
-- Name: mission_details mission_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mission_details
    ADD CONSTRAINT mission_details_pkey PRIMARY KEY (id_order, id_mission);


--
-- TOC entry 3297 (class 2606 OID 16518)
-- Name: missions_details missions_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT missions_details_pkey PRIMARY KEY (id_missiondet);


--
-- TOC entry 3295 (class 2606 OID 16520)
-- Name: missions missions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id_mission);


--
-- TOC entry 3299 (class 2606 OID 16522)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id_order);


--
-- TOC entry 3301 (class 2606 OID 16524)
-- Name: receivers receivers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receivers
    ADD CONSTRAINT receivers_pkey PRIMARY KEY (id_receiver);


--
-- TOC entry 3303 (class 2606 OID 16526)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id_transaction);


--
-- TOC entry 3305 (class 2606 OID 16528)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3307 (class 2606 OID 16530)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 3310 (class 2606 OID 16531)
-- Name: missions fk4rqgk9kbpyc6m7xsy9wgioq5d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT fk4rqgk9kbpyc6m7xsy9wgioq5d FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- TOC entry 3308 (class 2606 OID 16536)
-- Name: mission_details fkh0x87070vgfpol56wbmy8eak8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mission_details
    ADD CONSTRAINT fkh0x87070vgfpol56wbmy8eak8 FOREIGN KEY (id_order) REFERENCES public.orders(id_order);


--
-- TOC entry 3309 (class 2606 OID 16541)
-- Name: mission_details fki4igny7rgjpwyok9r1mo1bttk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mission_details
    ADD CONSTRAINT fki4igny7rgjpwyok9r1mo1bttk FOREIGN KEY (id_mission) REFERENCES public.missions(id_mission);


--
-- TOC entry 3318 (class 2606 OID 16546)
-- Name: transactions fknruuqcvl1t5a9cofppq9r6dgm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fknruuqcvl1t5a9cofppq9r6dgm FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- TOC entry 3314 (class 2606 OID 16551)
-- Name: orders fktb6jdc061vu6ydv1445lrigtb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fktb6jdc061vu6ydv1445lrigtb FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- TOC entry 3312 (class 2606 OID 16556)
-- Name: missions_details missions_details_id_mission_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT missions_details_id_mission_fkey FOREIGN KEY (id_mission) REFERENCES public.missions(id_mission);


--
-- TOC entry 3313 (class 2606 OID 16561)
-- Name: missions_details missions_details_id_oder_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT missions_details_id_oder_fkey FOREIGN KEY (id_oder) REFERENCES public.orders(id_order);


--
-- TOC entry 3311 (class 2606 OID 16566)
-- Name: missions missions_id_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_id_driver_fkey FOREIGN KEY (id_driver) REFERENCES public.users(id_user);


--
-- TOC entry 3315 (class 2606 OID 16571)
-- Name: orders orders_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.users(id_user);


--
-- TOC entry 3316 (class 2606 OID 16576)
-- Name: orders orders_id_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_driver_fkey FOREIGN KEY (id_driver) REFERENCES public.users(id_user);


--
-- TOC entry 3317 (class 2606 OID 16581)
-- Name: orders orders_id_receiver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_receiver_fkey FOREIGN KEY (id_receiver) REFERENCES public.receivers(id_receiver);


--
-- TOC entry 3319 (class 2606 OID 16586)
-- Name: transactions transactions_id_bank_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_id_bank_fkey FOREIGN KEY (id_bank) REFERENCES public.banks(id_bank);


--
-- TOC entry 3320 (class 2606 OID 16591)
-- Name: transactions transactions_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.users(id_user);


--
-- TOC entry 3321 (class 2606 OID 16596)
-- Name: users users_id_agency_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_agency_fkey FOREIGN KEY (id_agency) REFERENCES public.agencies(id_agency);


-- Completed on 2024-10-30 16:14:57

--
-- PostgreSQL database dump complete
--

