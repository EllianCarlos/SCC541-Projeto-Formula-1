CREATE table pilotos_e_escuderias AS
    select d.forename, d.surname, count(r.position), r.constructorid from driver d
    left join results r
    on d.driverid=r.driverid
    where r.position=1
    group by d.driverid ,r.constructorid;

CREATE INDEX IdxPilotoseEscuderias
ON pilotos_e_escuderias ("name");

CREATE OR REPLACE FUNCTION lista_pilotos(IN NomeEscuderia INT)
RETURNS TABLE (Nome TEXT, Sobrenome TEXT, Numero_Podios BIGINT)
AS $$
BEGIN
    RETURN QUERY
        select e.forename,e.surname,  e.count from pilotos_e_escuderias e
        where e.constructorid= NomeEscuderia
        order by e.forename ASC;
END;
$$ LANGUAGE plpgsql;