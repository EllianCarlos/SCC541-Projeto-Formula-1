--como requisitado para essa função criamos uma nova tabela para que possa ser feito um indice
--novo para acelerar o processo.


create table tabela_vitorias_ano As
        select count(r.position) as vitorias,ra."name",ra.year,r.driverid
        from results r
        join races ra
        on r.raceid = ra.raceid
        group by ra.year,ra."name",r.driverid;
        
create index Idxtabela_vitorias_ano on tabela_vitorias_ano("driverid");


CREATE OR REPLACE FUNCTION quantidade_vitorias(IN userid integer)
RETURNS TABLE (vitorias bigint, Nome_Corrida TEXT, Ano integer)
AS $$
BEGIN

    RETURN QUERY
        select count(r.vitorias),r."name",r.year
        from tabela_vitorias_ano r
        where r.driverid=userid
        group by rollup(r.year,r."name");
        
END;
$$ LANGUAGE plpgsql;