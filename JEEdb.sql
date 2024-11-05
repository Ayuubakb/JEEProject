--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-11-05 09:41:05

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
-- TOC entry 877 (class 1247 OID 16432)
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
-- TOC entry 880 (class 1247 OID 16450)
-- Name: driver_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.driver_type AS ENUM (
    'car',
    'truck'
);


ALTER TYPE public.driver_type OWNER TO postgres;

--
-- TOC entry 871 (class 1247 OID 16420)
-- Name: mission_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.mission_type AS ENUM (
    'inter city',
    'inter agency'
);


ALTER TYPE public.mission_type OWNER TO postgres;

--
-- TOC entry 874 (class 1247 OID 16426)
-- Name: order_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.order_type AS ENUM (
    'normal',
    'express'
);


ALTER TYPE public.order_type OWNER TO postgres;

--
-- TOC entry 865 (class 1247 OID 16404)
-- Name: receiver_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.receiver_type AS ENUM (
    'client',
    'firm'
);


ALTER TYPE public.receiver_type OWNER TO postgres;

--
-- TOC entry 862 (class 1247 OID 16397)
-- Name: role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role AS ENUM (
    'admin',
    'driver',
    'client'
);


ALTER TYPE public.role OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 16410)
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
-- TOC entry 218 (class 1259 OID 16456)
-- Name: agencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencies (
    id_agency integer NOT NULL,
    city character varying(255),
    address character varying(255) NOT NULL
);


ALTER TABLE public.agencies OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16455)
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
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 217
-- Name: agencies_id_agency_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencies_id_agency_seq OWNED BY public.agencies.id_agency;


--
-- TOC entry 222 (class 1259 OID 16480)
-- Name: banks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banks (
    id_bank integer NOT NULL,
    cardnum bigint NOT NULL,
    cvv integer NOT NULL,
    expiry_y integer NOT NULL,
    expiry_m integer NOT NULL,
    balance real,
    address character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    id_user integer
);


ALTER TABLE public.banks OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16479)
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
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 221
-- Name: banks_id_bank_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banks_id_bank_seq OWNED BY public.banks.id_bank;


--
-- TOC entry 233 (class 1259 OID 16628)
-- Name: mission_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mission_details (
    id_order integer NOT NULL,
    id_mission integer NOT NULL
);


ALTER TABLE public.mission_details OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16536)
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
    id_driver integer
);


ALTER TABLE public.missions OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16549)
-- Name: missions_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.missions_details (
    id_missiondet integer NOT NULL,
    id_oder integer,
    id_mission integer,
    id_order integer NOT NULL
);


ALTER TABLE public.missions_details OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16548)
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
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 231
-- Name: missions_details_id_missiondet_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.missions_details_id_missiondet_seq OWNED BY public.missions_details.id_missiondet;


--
-- TOC entry 229 (class 1259 OID 16535)
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
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 229
-- Name: missions_id_mission_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.missions_id_mission_seq OWNED BY public.missions.id_mission;


--
-- TOC entry 228 (class 1259 OID 16512)
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
    id_receiver integer,
    id_client integer,
    is_aborted boolean DEFAULT false,
    id_mission integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16511)
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
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_order_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_order_seq OWNED BY public.orders.id_order;


--
-- TOC entry 226 (class 1259 OID 16505)
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
-- TOC entry 225 (class 1259 OID 16504)
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
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 225
-- Name: receivers_id_receiver_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receivers_id_receiver_seq OWNED BY public.receivers.id_receiver;


--
-- TOC entry 224 (class 1259 OID 16487)
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
-- TOC entry 223 (class 1259 OID 16486)
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
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 223
-- Name: transactions_id_transaction_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_transaction_seq OWNED BY public.transactions.id_transaction;


--
-- TOC entry 220 (class 1259 OID 16465)
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
-- TOC entry 219 (class 1259 OID 16464)
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
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_user_seq OWNED BY public.users.id_user;


--
-- TOC entry 4755 (class 2604 OID 16459)
-- Name: agencies id_agency; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies ALTER COLUMN id_agency SET DEFAULT nextval('public.agencies_id_agency_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 16483)
-- Name: banks id_bank; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banks ALTER COLUMN id_bank SET DEFAULT nextval('public.banks_id_bank_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 16539)
-- Name: missions id_mission; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions ALTER COLUMN id_mission SET DEFAULT nextval('public.missions_id_mission_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 16552)
-- Name: missions_details id_missiondet; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details ALTER COLUMN id_missiondet SET DEFAULT nextval('public.missions_details_id_missiondet_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 16515)
-- Name: orders id_order; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id_order SET DEFAULT nextval('public.orders_id_order_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16508)
-- Name: receivers id_receiver; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receivers ALTER COLUMN id_receiver SET DEFAULT nextval('public.receivers_id_receiver_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 16490)
-- Name: transactions id_transaction; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id_transaction SET DEFAULT nextval('public.transactions_id_transaction_seq'::regclass);


--
-- TOC entry 4756 (class 2604 OID 16468)
-- Name: users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id_user SET DEFAULT nextval('public.users_id_user_seq'::regclass);


--
-- TOC entry 4953 (class 0 OID 16456)
-- Dependencies: 218
-- Data for Name: agencies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencies (id_agency, city, address) FROM stdin;
5	casablanca	531 Gueliz
6	agadir	talbourjte
3	rabat	531 Gueliz
4	marrakech	531 Gueliz
\.


--
-- TOC entry 4957 (class 0 OID 16480)
-- Dependencies: 222
-- Data for Name: banks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banks (id_bank, cardnum, cvv, expiry_y, expiry_m, balance, address, name, id_user) FROM stdin;
2	1234567891234567	555	2025	12	281	mhamid, marrakech	Ayoub Akoubri	42
3	1234567891234567	555	2025	12	3063	mhamid, casablanca	Noussair Sedki	44
\.


--
-- TOC entry 4968 (class 0 OID 16628)
-- Dependencies: 233
-- Data for Name: mission_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mission_details (id_order, id_mission) FROM stdin;
49	51
48	52
\.


--
-- TOC entry 4965 (class 0 OID 16536)
-- Dependencies: 230
-- Data for Name: missions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missions (id_mission, is_done, mission_type, start_date, end_date, from_city, to_city, id_driver) FROM stdin;
51	f	In_City	2024-11-05 09:32:56.519	\N	marrakech	marrakech	50
52	f	In_City	2024-11-05 09:37:01.662	\N	marrakech	marrakech	50
\.


--
-- TOC entry 4967 (class 0 OID 16549)
-- Dependencies: 232
-- Data for Name: missions_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.missions_details (id_missiondet, id_oder, id_mission, id_order) FROM stdin;
\.


--
-- TOC entry 4963 (class 0 OID 16512)
-- Dependencies: 228
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id_order, date, tracking_status, order_type, weight, price, priority, id_receiver, id_client, is_aborted, id_mission) FROM stdin;
50	2024-11-05 09:24:13.141	ProcessingOrder	Normal	2	30	0	12	44	f	\N
51	2024-11-05 09:25:07.519	ProcessingOrder	Normal	4	200	0	13	44	f	\N
52	2024-11-05 09:28:07.087	ProcessingOrder	Normal	5	75	0	14	43	f	\N
53	2024-11-05 09:28:55.29	ProcessingOrder	Express	2	150	0	15	43	f	\N
54	2024-11-05 09:30:09.638	ProcessingOrder	Normal	10	150	0	16	45	f	\N
55	2024-11-05 09:31:07.353	ProcessingOrder	Normal	6	300	0	17	45	f	\N
48	2024-11-05 09:20:36.47	CollectingFromSender	Normal	5	75	0	10	42	f	\N
49	2024-11-05 09:21:38.063	InCollectingAgency	Express	7	400	0	11	42	f	\N
\.


--
-- TOC entry 4961 (class 0 OID 16505)
-- Dependencies: 226
-- Data for Name: receivers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receivers (id_receiver, fullname, phone, address, city, email) FROM stdin;
3	receiver numberone	0600821400	581 marrakech	marrakech	receiver@gmail.com
4	second receiver	0662202873	agdal rabat	rabat	receiver2@gmail.com
5	numberthree rec	0662202873	california casabalanca	casablanca	receiver3@gmail.com
6	emailRepeated	0662202873	Daoudiate marrakech	marrakech	receiver3@gmail.com
7	saytama	07055255	chaleureux	agadir	saytama@gmail.com
9	Akoubri Ayoub	0700821400	daoudiate, marrakech	marrakech	ayoubakoubri@gmail.com
8	Ahmed Mustafa	0700821400	massira, marrakech	marrakech	ahmed@gmail.com
10	Jane Doe	0700821400	massira, marrakech	marrakech	jane@gmail.com
11	Antoine	0700821400	daoudiate, agadir	agadir	antoine@gmail.com
12	Anass	0700821400	casablanca	casablanca	anass@gmail.com
13	Karim	0700821400	rabat	rabat	karim@gmail.com
14	Simo	0700781400	Rabat	rabat	simo@gmail.com
15	Amine	0700781400	marrakech	marrakech	aamiine@gmail.com
16	Ahmed	0700821400	581° LOT Zerktouni	agadir	email@gmail.com
17	Omaar	0700781400	casablanca	casablanca	omar@gmail.com
\.


--
-- TOC entry 4959 (class 0 OID 16487)
-- Dependencies: 224
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id_transaction, amount, receiver_type, date, id_bank, id_client, receiver, id_user) FROM stdin;
\.


--
-- TOC entry 4955 (class 0 OID 16465)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, first_name, last_name, email, role, add_date, password, id_agency, driver_type, is_available, company, balance, is_active, dtype, address) FROM stdin;
42	Ayoub	Akoubri	ayoub@gmail.com	Client	2024-11-05 09:03:18.094	$2a$10$l6MzZUutWQ0FMarRnFbhU.3E7S9UFrie.bVfnwKNAPKiFhzq0918u	4	\N	\N	Apple	250	t	Client	daoudiate, marrakech
44	Noussair	Sedki	nsd@gmail.com	Client	2024-11-05 09:05:40.462	$2a$10$O7QNWaRCqZgYfkFIHTUCq.mQ2ihP1yx8u8i5bbZBVtngMPy/vhq16	5	\N	\N	Amazon	1000	t	Client	maarif, casablanca
43	abderahim	elothmani	abderahim@gmail.com	Client	2024-11-05 09:04:35.182	$2a$10$NS9LLQAJnjNSL6N/EajmFeenWrw4EAlwTmoDvDGuooSR/cCbgHpRG	3	\N	\N	Samsung	0	t	Client	medina , rabat
45	amine	elmetni	amine@gmail.com	Client	2024-11-05 09:07:08.713	$2a$10$5FuZ.QdV9j4Nsxzrf/DTF.EI5z.AUbSXxAr85oFgnBJ6TLoCD2nTi	6	\N	\N	Nike	0	t	Client	hay salam, agadir
46	ayoub	zahzouh	driverRabat@gmail.com	Driver	2024-11-05 09:10:58.301	$2a$10$t4YwieMN9Twgx2mgJWS6JODOnuZpR7nWlQTih.Em3AFQzjy.CsGV6	3	In_City	t	\N	\N	t	Driver	\N
47	ahmed	mustafa	driverRabatOut@gmail.com	Driver	2024-11-05 09:11:30.781	$2a$10$ajFJk5bn.h1QUCFeYqeySOhgcAFe.WPGeeTD1RQZycJx/QP/EXQuG	3	Inter_agency	t	\N	\N	t	Driver	\N
48	aymane	amine	driverCasablancaOut@gmail.com	Driver	2024-11-05 09:12:22.422	$2a$10$LMGBhBvpAJ9bZB7bUXqIq.6voSRocXppBOosKbDb63sr6oUlrd2Rm	5	Inter_agency	t	\N	\N	t	Driver	\N
49	reda	mourabite	driverCasablanca@gmail.com	Driver	2024-11-05 09:12:47.979	$2a$10$NCNwio343.HA4sxDQ.1r.eY5p9N.TVMvYxpUheAV74w6uCPB22JJi	5	In_City	t	\N	\N	t	Driver	\N
50	Abdel	Marcone	driverMarrakech@gmail.com	Driver	2024-11-05 09:13:22.407	$2a$10$S/Fu/SwuIFh8GxdxCgX9EOraaLg5/reCHMZF9Bx13lA65Nkt8/.mq	4	In_City	t	\N	\N	t	Driver	\N
51	bahaa	shimdane	driverMarrakechOut@gmail.com	Driver	2024-11-05 09:13:53.995	$2a$10$oP9Xj5NlAIafCig6daWaWuCICb.p43hPp27llk3PPxksN1SJPS4eq	4	Inter_agency	t	\N	\N	t	Driver	\N
52	diaa	alaoui	driverAgadirOut@gmail.com	Driver	2024-11-05 09:14:34.621	$2a$10$h..ZQA4x3tvwKtDvzSGWeuqE69fcJdAOJ5K3RJcfpUX15111I2SV6	6	Inter_agency	t	\N	\N	t	Driver	\N
53	nassim	el	driverAgadir@gmail.com	Driver	2024-11-05 09:14:57.204	$2a$10$hWKvxoa370EgtB2QuRcyzOZZO0yBxkilFSzIU1scSImk.SFDywfeO	6	In_City	t	\N	\N	t	Driver	\N
54	Hamza	Selab	managerAgadir@gmail.com	Manager	2024-11-05 09:16:42.557	$2a$10$GfNSx2o//QyHj/bo333TxeAo61rLosgMnvrPrnSDytDaLNJWWcDQ2	6	\N	\N	\N	\N	t	Manager	\N
55	Mehdi	Benrahou	managerMarrakech@gmail.com	Manager	2024-11-05 09:17:05.575	$2a$10$ZxwLpSC4InEosNANVDHyc.eC1sA4kiFlekV2XIUec7k4OFfwm7DuO	4	\N	\N	\N	\N	t	Manager	\N
56	Omar	Haouani	managerCasablanca@gmail.com	Manager	2024-11-05 09:17:28.35	$2a$10$apG4A157vcR/Og4BXZzjEeJJUa5P9kF09RKyns2uydymveUzzoMDu	5	\N	\N	\N	\N	t	Manager	\N
57	Yasser	Zidane	managerRabat@gmail.com	Manager	2024-11-05 09:17:59.003	$2a$10$W/2tSMY8ZZyFXvYItxD.tu7qM.ciyvppVFRQFEvCJT0qg65Q/MccS	3	\N	\N	\N	\N	t	Manager	\N
\.


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 217
-- Name: agencies_id_agency_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencies_id_agency_seq', 6, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 221
-- Name: banks_id_bank_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banks_id_bank_seq', 3, true);


--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 231
-- Name: missions_details_id_missiondet_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.missions_details_id_missiondet_seq', 1, false);


--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 229
-- Name: missions_id_mission_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.missions_id_mission_seq', 52, true);


--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_order_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_order_seq', 55, true);


--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 225
-- Name: receivers_id_receiver_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receivers_id_receiver_seq', 17, true);


--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 223
-- Name: transactions_id_transaction_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_transaction_seq', 1, false);


--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_user_seq', 57, true);


--
-- TOC entry 4772 (class 2606 OID 16567)
-- Name: agencies agencies_city_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies
    ADD CONSTRAINT agencies_city_key UNIQUE (city);


--
-- TOC entry 4774 (class 2606 OID 16461)
-- Name: agencies agencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencies
    ADD CONSTRAINT agencies_pkey PRIMARY KEY (id_agency);


--
-- TOC entry 4780 (class 2606 OID 16485)
-- Name: banks banks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banks
    ADD CONSTRAINT banks_pkey PRIMARY KEY (id_bank);


--
-- TOC entry 4792 (class 2606 OID 16632)
-- Name: mission_details mission_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mission_details
    ADD CONSTRAINT mission_details_pkey PRIMARY KEY (id_order, id_mission);


--
-- TOC entry 4790 (class 2606 OID 16554)
-- Name: missions_details missions_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT missions_details_pkey PRIMARY KEY (id_missiondet);


--
-- TOC entry 4788 (class 2606 OID 16542)
-- Name: missions missions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_pkey PRIMARY KEY (id_mission);


--
-- TOC entry 4786 (class 2606 OID 16519)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id_order);


--
-- TOC entry 4784 (class 2606 OID 16510)
-- Name: receivers receivers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receivers
    ADD CONSTRAINT receivers_pkey PRIMARY KEY (id_receiver);


--
-- TOC entry 4782 (class 2606 OID 16493)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id_transaction);


--
-- TOC entry 4776 (class 2606 OID 16644)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4778 (class 2606 OID 16471)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4794 (class 2606 OID 16694)
-- Name: banks fk8auk5r39dhmafs6saluflflds; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banks
    ADD CONSTRAINT fk8auk5r39dhmafs6saluflflds FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- TOC entry 4805 (class 2606 OID 16711)
-- Name: mission_details fkh0x87070vgfpol56wbmy8eak8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mission_details
    ADD CONSTRAINT fkh0x87070vgfpol56wbmy8eak8 FOREIGN KEY (id_order) REFERENCES public.orders(id_order);


--
-- TOC entry 4802 (class 2606 OID 16716)
-- Name: missions_details fkhhnwc1j8pkiis2ei2uv6b1msa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT fkhhnwc1j8pkiis2ei2uv6b1msa FOREIGN KEY (id_order) REFERENCES public.orders(id_order);


--
-- TOC entry 4806 (class 2606 OID 16706)
-- Name: mission_details fki4igny7rgjpwyok9r1mo1bttk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mission_details
    ADD CONSTRAINT fki4igny7rgjpwyok9r1mo1bttk FOREIGN KEY (id_mission) REFERENCES public.missions(id_mission);


--
-- TOC entry 4798 (class 2606 OID 16701)
-- Name: orders fkii8yfnwhxp4x9mxe4ff6yf3s2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fkii8yfnwhxp4x9mxe4ff6yf3s2 FOREIGN KEY (id_mission) REFERENCES public.missions(id_mission);


--
-- TOC entry 4795 (class 2606 OID 16665)
-- Name: transactions fknruuqcvl1t5a9cofppq9r6dgm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fknruuqcvl1t5a9cofppq9r6dgm FOREIGN KEY (id_user) REFERENCES public.users(id_user);


--
-- TOC entry 4803 (class 2606 OID 16560)
-- Name: missions_details missions_details_id_mission_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT missions_details_id_mission_fkey FOREIGN KEY (id_mission) REFERENCES public.missions(id_mission);


--
-- TOC entry 4804 (class 2606 OID 16555)
-- Name: missions_details missions_details_id_oder_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions_details
    ADD CONSTRAINT missions_details_id_oder_fkey FOREIGN KEY (id_oder) REFERENCES public.orders(id_order);


--
-- TOC entry 4801 (class 2606 OID 16543)
-- Name: missions missions_id_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.missions
    ADD CONSTRAINT missions_id_driver_fkey FOREIGN KEY (id_driver) REFERENCES public.users(id_user);


--
-- TOC entry 4799 (class 2606 OID 16530)
-- Name: orders orders_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.users(id_user);


--
-- TOC entry 4800 (class 2606 OID 16525)
-- Name: orders orders_id_receiver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_receiver_fkey FOREIGN KEY (id_receiver) REFERENCES public.receivers(id_receiver);


--
-- TOC entry 4796 (class 2606 OID 16494)
-- Name: transactions transactions_id_bank_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_id_bank_fkey FOREIGN KEY (id_bank) REFERENCES public.banks(id_bank);


--
-- TOC entry 4797 (class 2606 OID 16499)
-- Name: transactions transactions_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.users(id_user);


--
-- TOC entry 4793 (class 2606 OID 16474)
-- Name: users users_id_agency_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_agency_fkey FOREIGN KEY (id_agency) REFERENCES public.agencies(id_agency);


-- Completed on 2024-11-05 09:41:05

--
-- PostgreSQL database dump complete
--

