# Prodavnica personalizovanih planer PerPl

## Priprema

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

containerID za zeljeni kontejner se moze videti sa

```
sudo docker ps -a
primer docker kontenjer-a: b9d6a2547954
```

kreirati .env fajl sa relevantnim podacima 

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/planeri
API_URL=http://localhost:3001
JWT_SECRET=TAJNA_LOZINKA_ZA_JWT_TOKEN
JWT_EXPIRES=7d

```

Ukoliko ne postoji docker container sa našom bazom kad uradimo komandu

```
sudo docker ps -a
```

Pokrećemo komandu za pravljenje novog docker containera koji će se povezati sa SQL postgres bazom iz .env fajla

```
sudo docker run --name planeri-postgres
 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=planeri
 -p 5432:5432
 -v planeri_pgdata:/var/lib/postgresql/data
 -d postgres:17
```

nakon toga treba pokrenuti migracije
migracije su ovom kontekstu samo pravljenje baze 
tj. strukture same baze

```
npm run db:migrate
```

a postoji i seeder za svrhe testiranja i za popunjavanje baze sa odgovarajućim podacima

```
npm run db:seed
```

## Pokretanje

```
npm run dev
```
