# Prodavnica personalizovanih planera PerPl

PerPL je web prodavnica koja se bavi prodajom personalizovanih planera i stikera.
Korisnici mogu da kastomizaciju svoj planer na osnovu ponudjenog sadrzaja.
Korisnik moze da downloaduje pdf kao fakturu.
PerPl administratorima daje detaljne informacije o popularnosti i prodaji stikera i vrsta korica.
Takodje PerPl omogucava adminstratorima da prate i upravljaju porudzbinama
na osnovu korisnickih naloga.

## Tehnologije koje su bile koriscene

- Framework: Netx.js 16+
- Baza podataka: PostgresSQL(Drizzle ORM)
- Stilizacija: Tailwind i CSS
- Autentifikacija: JWT(JSON web tokens)
- Docker i docker-compose alati
- jezik: typescript


## Instrukcije za lokalno pokretanje

Prve svega treba instalirati sve neophodne pakete

```
npm install
```

zatim treba pokrenuti bazu podataka
naša baza se nalazi u docker container-u

za pokretanje docker kontejnera koristi se 

```
sudo docker container start containerID
```

containerID se moze pronaci preko ovde komande

```
sudo docker ps -a
primer docker kontenjer-a: b9d6a2547954
```

kreirati .env fajl sa relevantnim podacima 

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/planeri
API_URL=http://localhost:3000
JWT_SECRET=TAJNA_LOZINKA_ZA_JWT_TOKEN
JWT_EXPIRES=7d

```

Ukoliko ne postoji docker container, ako data komanda ne vraca nijedan container

```
sudo docker ps -a
```

Pokrećemo komandu za pravljenje novog docker containera koji će se povezati sa SQL postgres bazom iz .env fajla

```
sudo docker run --name planeri-postgres
 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=planeri
 -p 5432:5432
 -v pgdata:/var/lib/postgresql/data
 -d postgres:17
```

nakon toga treba pokrenuti migracije
migracije su izmene seme baze podataka
tj. strukture seme baze

```
npm run db:migrate
```

a zatim i radimo komandu za seeder radi testiranja i za popunjavanje baze sa odgovarajućim podacima

```
npm run db:seed
```

### Pokretanje

```
npm run dev
```

## Instrukcije za pokretanje preko docker-a

Aplikacija je sacuvana u potpunosti preko Docker container-a i moze da se pokrene 
samo sa jednom komandom

```
docker compose up --build
```
Ova komanda:

 -gradi Docker image aplikacije(Netx.js + Dizzle + PostgresSQL)
 -pokrece container za bazu podataka (PostgresSQL)
 -povezuje container za bazu PostgresSQL container i za aplikaciju preko okruzenja 
  koje je definisano u .env fajlu
 -prikazuje web aplikaciju na port http://localhost:3000


## Struktura aplikacije

Aplikacija je organizovana prema principu rutiranja u Next.js. 

### Backend rute(src/app/api)

Sva serverska logika povezivanja baze podataka sa frontend delom aplikacije
se desava preko api zahteva tacnije u api folderu koji su zasticeni od bezbednosnih
napada (XSS, COSR i SQL Injections).

-**api/auth** - se nalaze nasi lokalni api zahtevi za upravljanje nad korisnicima, narudzbenicama, stikerima i planerima
-**api/external**- nalaze se ekterni API zahtevi za prikazivanje zen citata i cinjenicama o mackama

### Frontend (korisnicki interfejsi i stranice)

Stranice su grupisane po funkcionalnim celinama:
  
 - **admin-strana/** - stranica za upravljanje naruzbenicama i korisnicima i prikaz statistika
 - **profil/** - stranica za prikaz informacija o korisniku 
 - **sign-in/** - stranica za registrovanje korisnika
 - **log-in/** - stranica za prijavljivanje korisnika
 - **kastomizacija/** - stranica za kastomizaciju planera
 - **prodavnica/** - stranica za prodavnicu stikera
 - **korpa/** - stranica za prikaz proizvoda koji se nalaze u korpi
 - **placanje/** - stranica za konacnu kupovinu proizvoda iz korpa stranice
 - **faktura/** - stranica za izdavanje fakture korisniku


