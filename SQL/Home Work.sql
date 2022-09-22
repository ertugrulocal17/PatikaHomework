-- HomeWork 1
1. film tablosunda bulunan title ve description sütunlarındaki verileri sıralayınız.
2. film tablosunda bulunan tüm sütunlardaki verileri film uzunluğu (length) 60 dan büyük VE 75 ten küçük olma koşullarıyla sıralayınız.
3. film tablosunda bulunan tüm sütunlardaki verileri rental_rate 0.99 VE replacement_cost 12.99 VEYA 28.99 olma koşullarıyla sıralayınız.
4. customer tablosunda bulunan first_name sütunundaki değeri 'Mary' olan müşterinin last_name sütunundaki değeri nedir?
5. film tablosundaki uzunluğu(length) 50 ten büyük OLMAYIP aynı zamanda rental_rate değeri 2.99 veya 4.99 OLMAYAN verileri sıralayınız.

SELECT title, description FROM film;
SELECT * FROM film WHERE length > 60 AND length < 75;
SELECT * FROM film WHERE rental_rate = 0.99 AND replacement_cost = 12.99 OR replacement_cost = 28.99;
SELECT * FROM customer WHERE first_name = 'Mary'; --Smith
SELECT * from film WHERE NOT(length > 50 OR rental_rate = 2.99 OR rental_rate = 4.99);

-- HomeWork 2
1. film tablosunda bulunan tüm sütunlardaki verileri replacement cost değeri 12.99 dan büyük eşit ve 16.99 küçük olma koşuluyla sıralayınız ( BETWEEN - AND yapısını kullanınız.)
2. actor tablosunda bulunan first_name ve last_name sütunlardaki verileri first_name 'Penelope' veya 'Nick' veya 'Ed' değerleri olması koşuluyla sıralayınız. ( IN operatörünü kullanınız.)
3. film tablosunda bulunan tüm sütunlardaki verileri rental_rate 0.99, 2.99, 4.99 VE replacement_cost 12.99, 15.99, 28.99 olma koşullarıyla sıralayınız. ( IN operatörünü kullanınız.)

SELECT * FROM film WHERE replacement_cost BETWEEN 12.99 AND 16.99;
SELECT first_name, last_name FROM actor WHERE first_name IN('Penel','NICK','ED');
SELECT * FROM film WHERE rental_rate IN (0.99,2.99,4.99) AND replacement_cost IN(12.99, 15.99, 28.99);

-- HomeWork 3
1. country tablosunda bulunan country sütunundaki ülke isimlerinden 'A' karakteri ile başlayıp 'a' karakteri ile sonlananları sıralayınız.
2. country tablosunda bulunan country sütunundaki ülke isimlerinden en az 6 karakterden oluşan ve sonu 'n' karakteri ile sonlananları sıralayınız.
3. film tablosunda bulunan title sütunundaki film isimlerinden en az 4 adet büyük ya da küçük harf farketmesizin 'T' karakteri içeren film isimlerini sıralayınız.
4. film tablosunda bulunan tüm sütunlardaki verilerden title 'C' karakteri ile başlayan ve uzunluğu (length) 90 dan büyük olan ve rental_rate 2.99 olan verileri sıralayınız.

SELECT country FROM country WHERE country ~~ 'A%a';
SELECT country FROM country WHERE country ~~ '_____%n';
SELECT title FROM film WHERE title ~~* '%T%%T%%T%%T%';
SELECT * FROM film WHERE title ~~ 'C%' AND length > 90 AND rental_rate = 2.99;

--HomeWork 4
1. film tablosunda bulunan replacement_cost sütununda bulunan birbirinden farklı değerleri sıralayınız.
2. film tablosunda bulunan replacement_cost sütununda birbirinden farklı kaç tane veri vardır?
3. film tablosunda bulunan film isimlerinde (title) kaç tanesini T karakteri ile başlar ve aynı zamanda rating 'G' ye eşittir?
4. country tablosunda bulunan ülke isimlerinden (country) kaç tanesi 5 karakterden oluşmaktadır?
5. city tablosundaki şehir isimlerinin kaç tanesi 'R' veya r karakteri ile biter?

SELECT DISTINCT replacement_cost FROM film;
SELECT COUNT (DISTINCT replacement_cost) FROM film; 
SELECT COUNT (title) FROM film WHERE title LIKE 'T%' AND rating = 'G'; 
SELECT COUNT (country) FROM country WHERE country LIKE '_____'; 
SELECT COUNT (city) FROM city WHERE city ILIKE '%R'; 

--HomeWork 5
1. film tablosunda bulunan ve film ismi (title) 'n' karakteri ile biten en uzun (length) 5 filmi sıralayınız.
2. film tablosunda bulunan ve film ismi (title) 'n' karakteri ile biten en kısa (length) ikinci(6,7,8,9,10) 5 filmi(6,7,8,9,10) sıralayınız.
3. customer tablosunda bulunan last_name sütununa göre azalan yapılan sıralamada store_id 1 olmak koşuluyla ilk 4 veriyi sıralayınız.

SELECT title FROM film WHERE title LIKE '%n' ORDER BY LENGTH DESC LIMIT 5;
SELECT title FROM film WHERE title LIKE '%n' ORDER BY LENGTH OFFSET 5 LIMIT 5;
SELECT last_name FROM customer WHERE store_id = 1 ORDER BY last_name DESC LIMIT 4;

--HomeWork 6
1. film tablosunda bulunan rental_rate sütunundaki değerlerin ortalaması nedir?
2. film tablosunda bulunan filmlerden kaç tanesi 'C' karakteri ile başlar?
3. film tablosunda bulunan filmlerden rental_rate değeri 0.99 a eşit olan en uzun (length) film kaç dakikadır?
4. film tablosunda bulunan filmlerin uzunluğu 150 dakikadan büyük olanlarına ait kaç farklı replacement_cost değeri vardır?

SELECT AVG (rental_rate) FROM film;
SELECT COUNT (title) FROM film WHERE title LIKE 'C%'; 
SELECT MAX (length) FROM film WHERE rental_rate = 0.99;
SELECT COUNT (DISTINCT replacement_cost) FROM film WHERE length > 150;

--HomeWrok 7
1. film tablosunda bulunan filmleri rating değerlerine göre gruplayınız.
2. film tablosunda bulunan filmleri replacement_cost sütununa göre grupladığımızda film sayısı 50 den fazla olan replacement_cost değerini ve karşılık gelen film sayısını sıralayınız.
3. customer tablosunda bulunan store_id değerlerine karşılık gelen müşteri sayılarını nelerdir? 
4. city tablosunda bulunan şehir verilerini country_id sütununa göre gruplandırdıktan sonra en fazla şehir sayısı barındıran country_id bilgisini ve şehir sayısını paylaşınız.

SELECT rating FROM fim GROUP BY rating;
SELECT COUNT(*), replacement_cost FROM film GROUP BY replacement_cost HAVING COUNT(*) > 50;
SELECT COUNT(*), store_id FROM customer GROUP BY store_id;
SELECT COUNT(*), country_id FROM city GROUP BY country_id ORDER BY COUNT(city) DESC LIMIT 1;

--HomeWork 8
1. test veritabanınızda employee isimli sütun bilgileri id(INTEGER), name VARCHAR(50), birthday DATE, email VARCHAR(100) olan bir tablo oluşturalım.
2. Oluşturduğumuz employee tablosuna 'Mockaroo' servisini kullanarak 50 adet veri ekleyelim.
3. Sütunların her birine göre diğer sütunları güncelleyecek 5 adet UPDATE işlemi yapalım.
4. Sütunların her birine göre ilgili satırı silecek 5 adet DELETE işlemi yapalım.

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    email VARCHAR(100) NOT NULL
);
SELECT * FROM employee;

insert into employee (name, birthday, email) values ('Rahal Grevel', '1928-10-11', 'rgrevel0@narod.ru');
insert into employee (name, birthday, email) values ('Christabella McCahey', '2013-08-30', 'cmccahey1@about.com');
insert into employee (name, birthday, email) values ('Willetta Apple', '1961-03-06', 'wapple2@earthlink.net');
insert into employee (name, birthday, email) values ('Richart Puckinghorne', '1935-01-31', 'rpuckinghorne3@youtu.be');
insert into employee (name, birthday, email) values ('Gerardo Wheatman', '2003-05-02', 'gwheatman4@craigslist.org');
insert into employee (name, birthday, email) values ('Thomasine Dickerline', '1993-08-15', 'tdickerline5@indiatimes.com');
insert into employee (name, birthday, email) values ('Dylan Yalden', '1997-01-08', 'dyalden6@wisc.edu');
insert into employee (name, birthday, email) values ('Rosco Kightly', '1915-06-29', 'rkightly7@myspace.com');
insert into employee (name, birthday, email) values ('Shoshanna Fennell', '1996-07-17', 'sfennell8@paginegialle.it');
insert into employee (name, birthday, email) values ('Berny Youngs', '1985-08-15', 'byoungs9@google.cn');
insert into employee (name, birthday, email) values ('Roselin Stelfax', '2019-07-08', 'rstelfaxa@nifty.com');
insert into employee (name, birthday, email) values ('Carly Hiom', '1927-03-06', 'chiomb@mediafire.com');
insert into employee (name, birthday, email) values ('Alric Spinley', '1908-05-02', 'aspinleyc@home.pl');
insert into employee (name, birthday, email) values ('Shirline Recke', '2000-10-25', 'srecked@usgs.gov');
insert into employee (name, birthday, email) values ('Tana Clemenzo', '1929-08-31', 'tclemenzoe@pbs.org');
insert into employee (name, birthday, email) values ('Olympie Rummings', '1934-09-23', 'orummingsf@bandcamp.com');
insert into employee (name, birthday, email) values ('Shelton Doncom', '1952-04-21', 'sdoncomg@mtv.com');
insert into employee (name, birthday, email) values ('Leah Ravenshear', '1947-12-28', 'lravenshearh@imageshack.us');
insert into employee (name, birthday, email) values ('Glenn Mackriell', '1963-02-23', 'gmackrielli@microsoft.com');
insert into employee (name, birthday, email) values ('Becka Raftery', '1921-11-22', 'brafteryj@instagram.com');
insert into employee (name, birthday, email) values ('Babita Smaling', '1931-10-08', 'bsmalingk@google.es');
insert into employee (name, birthday, email) values ('Beilul Renhard', '1944-03-09', 'brenhardl@squidoo.com');
insert into employee (name, birthday, email) values ('Mandi Blaydon', '2013-06-14', 'mblaydonm@multiply.com');
insert into employee (name, birthday, email) values ('Quentin Beeken', '1996-01-09', 'qbeekenn@reddit.com');
insert into employee (name, birthday, email) values ('Eda Edyson', '2019-03-09', 'eedysono@psu.edu');
insert into employee (name, birthday, email) values ('Shari Bolle', '1945-03-04', 'sbollep@imageshack.us');
insert into employee (name, birthday, email) values ('Dewitt Ticehurst', '1945-01-26', 'dticehurstq@netvibes.com');
insert into employee (name, birthday, email) values ('Hewie Spaule', '1990-01-30', 'hspauler@dagondesign.com');
insert into employee (name, birthday, email) values ('Frans Blandamore', '1960-07-16', 'fblandamores@engadget.com');
insert into employee (name, birthday, email) values ('Niki Alcide', '1995-03-17', 'nalcidet@aboutads.info');
insert into employee (name, birthday, email) values ('Torin Ponton', '1925-09-20', 'tpontonu@mysql.com');
insert into employee (name, birthday, email) values ('Nadia Attwill', '1902-11-06', 'nattwillv@scribd.com');
insert into employee (name, birthday, email) values ('Lavena Smiz', '1948-07-27', 'lsmizw@prlog.org');
insert into employee (name, birthday, email) values ('Glen Heasley', '1991-02-10', 'gheasleyx@wordpress.org');
insert into employee (name, birthday, email) values ('Kitti Mottershaw', '1944-04-03', 'kmottershawy@google.cn');
insert into employee (name, birthday, email) values ('Linn Eckart', '1936-08-19', 'leckartz@earthlink.net');
insert into employee (name, birthday, email) values ('Marti Perigoe', '1973-08-24', 'mperigoe10@netvibes.com');
insert into employee (name, birthday, email) values ('Penelope Huckabe', '1944-01-01', 'phuckabe11@dedecms.com');
insert into employee (name, birthday, email) values ('Davidde Capes', '1928-01-02', 'dcapes12@jimdo.com');
insert into employee (name, birthday, email) values ('Lamar Boshell', '1988-12-28', 'lboshell13@webnode.com');
insert into employee (name, birthday, email) values ('Brina Bernollet', '2014-03-21', 'bbernollet14@ebay.co.uk');
insert into employee (name, birthday, email) values ('Danica Hatchman', '2017-11-29', 'dhatchman15@printfriendly.com');
insert into employee (name, birthday, email) values ('Osborn Stockton', '1969-12-18', 'ostockton16@sciencedirect.com');
insert into employee (name, birthday, email) values ('Neron Suatt', '1985-11-01', 'nsuatt17@flavors.me');
insert into employee (name, birthday, email) values ('Arvie Rault', '1906-09-22', 'arault18@miitbeian.gov.cn');
insert into employee (name, birthday, email) values ('Talyah Muat', '1963-04-09', 'tmuat19@bandcamp.com');
insert into employee (name, birthday, email) values ('Rhiamon Pinnion', '1916-12-20', 'rpinnion1a@wufoo.com');
insert into employee (name, birthday, email) values ('Adair Huortic', '1934-01-16', 'ahuortic1b@bluehost.com');
insert into employee (name, birthday, email) values ('Kellia Fawdrie', '1911-09-12', 'kfawdrie1c@ebay.com');
insert into employee (name, birthday, email) values ('Beverley Tite', '1994-12-04', 'btite1d@taobao.com');
SELECT * FROM employee;

UPDATE employee SET name = 'Lal' WHERE id = 10;
UPDATE employee SET email = 'ahmet@email.com' WHERE id = 11;
UPDATE employee SET name = 'Ali' WHERE id = 12;
UPDATE employee SET email = 'ali@email.com' WHERE id = 13;
UPDATE employee SET email = 'veli@email.com' WHERE id = 14;
SELECT * FROM employee;

DELETE FROM employee WHERE name = 'Lal';
DELETE FROM employee WHERE name = 'Ali';
DELETE FROM employee WHERE email = 'ali@email.com';
DELETE FROM employee WHERE email = 'veli@email.com';
DELETE FROM employee WHERE birthday = '2019-07-08';
SELECT * FROM employee;

--HomeWork 9
1. city tablosu ile country tablosunda bulunan şehir (city) ve ülke (country) isimlerini birlikte görebileceğimiz INNER JOIN sorgusunu yazınız.
2. customer tablosu ile payment tablosunda bulunan payment_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz INNER JOIN sorgusunu yazınız.
3. customer tablosu ile rental tablosunda bulunan rental_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz INNER JOIN sorgusunu yazınız.

SELECT city, country FROM city
INNER JOIN country 
ON city.country_id = country.country_id; 

SELECT payment_id, first_name, last_name FROM payment
INNER JOIN customer 
ON payment.customer_id = customer.customer_id; 

SELECT rental_id, first_name, last_name FROM rental
INNER JOIN customer 
ON rental.customer_id = customer.customer_id; 

--HomeWork 10
1. city tablosu ile country tablosunda bulunan şehir (city) ve ülke (country) isimlerini birlikte görebileceğimiz LEFT JOIN sorgusunu yazınız.
2. customer tablosu ile payment tablosunda bulunan payment_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz RIGHT JOIN sorgusunu yazınız.
3. customer tablosu ile rental tablosunda bulunan rental_id ile customer tablosundaki first_name ve last_name isimlerini birlikte görebileceğimiz FULL JOIN sorgusunu yazınız.

SELECT city, country FROM city
LEFT JOIN country 
ON city.country_id = country.country_id;

SELECT payment_id, first_name, last_name FROM customer
RIGHT JOIN payment 
ON customer.customer_id  = payment.customer_id; 

SELECT rental_id, first_name, last_name FROM customer
FULL JOIN rental 
ON rental.customer_id = customer.customer_id; 

--HomeWork 11
1. actor ve customer tablolarında bulunan first_name sütunları için tüm verileri sıralayalım.
2. actor ve customer tablolarında bulunan first_name sütunları için kesişen verileri sıralayalım.
3. actor ve customer tablolarında bulunan first_name sütunları için ilk tabloda bulunan ancak ikinci tabloda bulunmayan verileri sıralayalım.
4. İlk 3 sorguyu tekrar eden veriler için de yapalım.

(
SELECT first_name FROM actor
)
UNION 
(
SELECT first_name FROM customer
)

(
SELECT first_name FROM actor
)
INTERSECT 
(
SELECT first_name FROM customer
)

(
SELECT first_name FROM actor
)
EXCEPT 
(
SELECT first_name FROM customer
)

(
SELECT first_name FROM actor
)
UNION ALL
(
SELECT first_name FROM customer
)

(
SELECT first_name FROM actor
)
INTERSECT ALL
(
SELECT first_name FROM customer
)

(
SELECT first_name FROM actor
)
EXCEPT ALL
(
SELECT first_name FROM customer
)

--HomeWork 12
1. film tablosunda film uzunluğu length sütununda gösterilmektedir. Uzunluğu ortalama film uzunluğundan fazla kaç tane film vardır?
2. film tablosunda en yüksek rental_rate değerine sahip kaç tane film vardır?
3. film tablosunda en düşük rental_rate ve en düşün replacement_cost değerlerine sahip filmleri sıralayınız.
4. payment tablosunda en fazla sayıda alışveriş yapan müşterileri(customer) sıralayınız.

SELECT COUNT (*) FROM film
WHERE length > ANY (
    SELECT AVG(length) FROM film
);

SELECT COUNT (*) FROM film
WHERE rental_rate = (
    SELECT MAX(rental_rate) FROM film
);

SELECT * FROM film
WHERE rental_rate = (
    SELECT MIN(rental_rate) FROM film) 
    AND replacement_cost = (
        SELECT MIN(replacement_cost) FROM film
    );

SELECT customer.customer_id, customer.first_name, COUNT(*) FROM payment 
INNER JOIN customer ON payment.customer_id = customer.customer_id
Group By customer.customer_id
Order By COUNT(*) DESC;


--Recap
1. film tablosundan 'K' karakteri ile başlayan en uzun ve replacenet_cost u en düşük 4 filmi sıralayınız.
2. film tablosunda içerisinden en fazla sayıda film bulunduran rating kategorisi hangisidir?
3. cutomer tablosunda en çok alışveriş yapan müşterinin adı nedir?
4. category tablosundan kategori isimlerini ve kategori başına düşen film sayılarını sıralayınız.
5. film tablosunda isminde en az 4 adet 'e' veya 'E' karakteri bulunan kç tane film vardır?

SELECT title FROM film
WHERE title LIKE 'K%'
ORDER BY length DESC,replacement_cost ASC
LIMIT 4;

SELECT rating,COUNT(*) FROM film
GROUP BY rating
ORDER BY rating DESC
LIMIT 1;

SELECT customer.first_name,COUNT(*) FROM customer
INNER JOIN payment ON customer.customer_id = payment.customer_id
GROUP BY customer.first_name
ORDER BY COUNT(*) DESC
LIMIT 1;

SELECT name, COUNT(*) FROM category
INNER JOIN film_category ON category.category_id = film_category.category_id
GROUP BY category.category_id 
ORDER BY COUNT(*) DESC;

SELECT COUNT(*) FROM film
WHERE title ILIKE '%e%e%e%e%';