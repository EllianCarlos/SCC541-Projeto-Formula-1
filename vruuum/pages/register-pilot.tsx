import Header from "@/components/header";
import HomeButton from "@/components/home-button";
import type { NextPage } from "next";
import styles from "../styles/Form.module.css";

const RegisterPilot: NextPage = () => {
  return <>
    <Header></Header>
  <h2>Cadastrar Piloto</h2>
  <form action="" className={styles.form}>
    <label htmlFor="ConsctructorRef">Nome de referência para o Construtor:</label>
    <input className={styles.input} type="text" placeholder="escuderia_x" id="ConsctructorRef" name="Driverref" pattern="[a-zA-Z_]+" title="apenas caracteres alfabeticos e o underscore" />
    <label htmlFor="ConsctructorRef">Número do Piloto</label>
    <input className={styles.input} type="text" placeholder="908098" id="Name" name="Number" pattern="[0-9]+" title="apenas caracteres numéricos"/>
    <label htmlFor="ConsctructorRef">Código do Piloto</label>
    <input className={styles.input} type="text" placeholder="C20020" id="Code" name="Code" />
    <label htmlFor="ConsctructorRef">Primeiro Nome</label>
    <input className={styles.input} type="text" placeholder="José" id="Forename" name="Forename" />
    <label htmlFor="ConsctructorRef">Segundo Nome</label>
    <input className={styles.input} type="text" placeholder="da Silva" id="Forename" name="Forename" />
    <label htmlFor="ConsctructorRef">Data de Nascimento</label>
    <input className={styles.input} type="date" placeholder="19/09/2000" id="Date of Birth" name="Date of Birth" />
    <label htmlFor="ConsctructorRef">Nacionalidade</label>
    <input className={styles.input} type="text" placeholder="Pais Y" id="Nationality" name="Nationality" />
    <br />
    <button type="submit">Adicionar Escuderia</button>
  </form>
  <br />
  <HomeButton></HomeButton>
  </>;
};

export default RegisterPilot;
