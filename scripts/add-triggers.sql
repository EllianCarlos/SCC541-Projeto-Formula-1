
-- Função e trigger de inserção de escuderia
CREATE OR REPLACE FUNCTION insere_escuderia()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users(login, password, tipo, idoriginal)
        VALUES (concat(NEW.constructorref, '_c') , MD5(NEW.constructorref), 'Escuderia', NEW.constructorid);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER insere_escuderia_t
    AFTER INSERT OR UPDATE ON constructors
    FOR EACH ROW
    EXECUTE FUNCTION insere_escuderia();

-- Função e trigger de inserção de piloto
CREATE OR REPLACE FUNCTION insere_piloto()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users(login, password, tipo, idoriginal)
        VALUES (concat(NEW.driverref, '_d') , MD5(NEW.driverref), 'Piloto', NEW.driverid);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER insere_piloto_t
    AFTER INSERT OR UPDATE ON driver
    FOR EACH ROW
    EXECUTE FUNCTION insere_piloto();

-- Verifica se aquele login já existe
CREATE OR REPLACE FUNCTION verifica_duplicata(tuple users)
RETURNS BOOLEAN AS $$
BEGIN
    PERFORM *
        FROM users
        WHERE login = tuple.login
            -- Reverte a password com o MD5 aplicado
            AND MD5(password) = MD5(tuple.password);
    
    IF FOUND THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Função e trigger de inserção de usuários
CREATE OR REPLACE FUNCTION insere_users()
RETURNS TRIGGER AS $$
BEGIN
    IF verifica_duplicata(NEW) THEN
        RAISE 'Usuario ja existe';
    END IF;

    IF (NEW.tipo = 'Escuderia') THEN
        INSERT INTO users(login, password, tipo, idoriginal)
            VALUES (concat(NEW.constructorref, '_c') , MD5(NEW.constructorref), 'Escuderia', NEW.constructorid);
    ELSIF (NEW.tipo = 'Piloto') THEN
        INSERT INTO users(login, password, tipo, idoriginal)
            VALUES (concat(NEW.driverref, '_d') , MD5(NEW.driverref), 'Piloto', NEW.driverid);
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER insere_users_t
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION insere_users();

-- Faz a listagem dos status, baseado no tipo de usuário e, se existente, do idoriginal dele
CREATE OR REPLACE FUNCTION lista_status(tipo TEXT, idoriginal INTEGER)
RETURNS TABLE (quantidade BIGINT, nome_status TEXT) AS $$
BEGIN
    IF (tipo = 'Administrador') THEN
        RETURN QUERY
            SELECT COUNT(*) quantidade, s.status
            FROM results r
            JOIN status s
                ON r.statusid = s.statusid
            GROUP BY s.status
            ORDER BY quantidade DESC;
    ELSIF (tipo = 'Escuderia') THEN
        RETURN QUERY
            SELECT COUNT(*) quantidade, s.status
            FROM results r
            JOIN status s
                ON r.statusid = s.statusid
            WHERE r.constructorid = idoriginal
            GROUP BY s.status
            ORDER BY quantidade DESC;
    ELSIF (tipo = 'Piloto') THEN
        RETURN QUERY
            SELECT COUNT(*) quantidade, s.status
            FROM results r
            JOIN status s
                ON r.statusid = s.statusid
            WHERE r.driverid = idoriginal
            GROUP BY s.status
            ORDER BY quantidade DESC;
    END IF;
END;
$$ LANGUAGE plpgsql;

drop trigger insere_users_t on users;
-------------------------------------------------------------------------------

-- Exemplo de relatório 1
-- SELECT * FROM lista_status('Administrador', 1);
-- Exemplo de relatório 4
-- SELECT * FROM lista_status('Escuderia', 1);
-- Exemplo de relatório 6
-- SELECT * FROM lista_status('Piloto', 1);


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