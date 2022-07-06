CREATE TABLE users (
    userid SERIAL NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL, -- Lembrando que será usado a função MD5
    tipo TEXT NOT NULL,
    idoriginal INTEGER NOT NULL,

    CONSTRAINT PK_users PRIMARY KEY (userid),
    CONSTRAINT CK_tipo CHECK (tipo IN ('Administrador', 'Escuderia', 'Piloto'))
);

-- Copia para a tabela users os dados já existentes nas outras tabelas
CREATE OR REPLACE PROCEDURE popula_users()
AS $$
BEGIN
    INSERT INTO users(login, password, tipo, idoriginal)
        VALUES ('admin', MD5('admin'), 'Administrador', 1);
    INSERT INTO users(login, password, tipo, idoriginal)
        SELECT concat(constructorref, '_c') , MD5(constructorref), 'Escuderia' tipo, constructorid
        FROM constructors;
    INSERT INTO users(login, password, tipo, idoriginal)
        SELECT concat(driverref, '_d') , MD5(driverref), 'Piloto' tipo, driverid
        FROM driver;
END;
$$ LANGUAGE plpgsql;

-- Faz a população da tabela
CALL popula_users();
