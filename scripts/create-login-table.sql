DROP TABLE Users;
CREATE Table if not exists USERS(
    Userid integer primary key,
    Login VARCHAR(50) unique,
    Password VARCHAR(50) Not NULL,
    Tipo VARCHAR(25),
    IdOriginal integer Not NULL
);

CREATE OR REPLACE FUNCTION VerificaPiloto() 
RETURNS trigger LANGUAGE plpgsql
AS $$
BEGIN
      
    IF ((SELECT count(driverref) FROM driver where driverref = NEW.login) = 1 and new.userid<10000) THEN
    update users
    set tipo='Piloto', login=concat(new.login,'_d')
    where login=new.login;
    ELSEIF((SELECT count(constructorref) FROM constructors where constructorref = NEW.login) = 1 and new.userid>10000) THEN
    update users
    set tipo='Escuderia',login=concat(new.login,'_c')
    where login=new.login;
    END IF;
RETURN NEW;
END;
$$

drop trigger VerPiloto on users;

CREATE TRIGGER VerPiloto
AFTER INSERT ON users
FOR EACH row
when(new.tipo is null)
EXECUTE PROCEDURE VerificaPiloto();

delete from users;

insert into users(Userid,Login,Password,IdOriginal)
select row_number() over(order by driverid ASC),driverref,MD5(driverref),driverid 
from driver;

insert into users(Userid,Login,Password,IdOriginal)
select row_number() over(order by constructorid ASC)+10000,constructorref,MD5(constructorref),constructorid 
from constructors