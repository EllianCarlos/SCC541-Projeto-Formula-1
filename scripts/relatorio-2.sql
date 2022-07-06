CREATE EXTENSION IF NOT EXISTS Cube;
CREATE EXTENSION IF NOT EXISTS EarthDistance;  -- EarthDistance precisa de Cube

CREATE table airports_Med_and_Large AS
	SELECT *
	FROM airports g
	WHERE g.type='medium_airport' or
    g.type='large_airport';

CREATE table cidades_brasileiras AS
	SELECT g.lat, g.long, g.name, g.population, g.country
	FROM geocities15k g
	WHERE g.country = 'BR';

CREATE INDEX IdxCidadesNomeOrdenado
ON cidades_brasileiras ("name");


CREATE OR REPLACE FUNCTION lista_cidade(IN cidade_requisitada TEXT)
RETURNS TABLE (NomeCidade TEXT, IATA_CODE TEXT, Nome_Aeroporto TEXT, Cidade_Aeroporto TEXT, distancia_C_A double precision,tipo_Aeroporto TEXT) AS $$
BEGIN
    RETURN QUERY
        select g.name, a.iatacode::TEXT , a.name , a.city ,
        earth_distance(ll_to_earth(a.Latdeg, a.Longdeg),ll_to_earth(g.Lat, g.Long)) as distancia_C_A,
        a.type::TEXT 
        from airports_Med_and_Large a
        JOIN cidades_brasileiras g
		ON earth_distance(ll_to_earth(a.Latdeg, a.Longdeg), 
			ll_to_earth(g.Lat, g.Long)) <= 100000 and g."name"= cidade_requisitada;
END;
$$ LANGUAGE plpgsql;