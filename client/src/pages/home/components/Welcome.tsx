import React from "react";
import styled from "@emotion/styled";
import { Header } from "../../../components";
import { ButtonProps, ButtonVariant } from "../../../components/types";
import { useCookies } from "react-cookie";
// import { useTranslation } from 'react-i18next'

const CenteredDiv = styled.div`
    text-align: center;
    padding-top: 10px;
`;

const StrongDiv = styled.div`
    padding-top: 10px;
    font-weight: bold;
`;

const TextDiv = styled.div`
    padding-top: 5px;
`;

const BlockDiv = styled.div`
    padding-top: 15px;
`;

const Welcome = () => {
    const [cookies, , removeCookie] = useCookies(["token"]);
    // const { t } = useTranslation()

    const headerButtons: ButtonProps[] = cookies.token
        ? [
              {
                  onClick: () => {},
                  label: "Features",
                  to: "/features",
              },
              {
                  onClick: () => {
                      removeCookie("token");
                  },
                  label: "Log out",
                  variant: ButtonVariant.DANGER,
              },
          ]
        : [
              { onClick: () => {}, label: "Log in", to: "/login" },
              {
                  onClick: () => {},
                  label: "Sign up",
                  to: "/signup",
                  variant: ButtonVariant.OUTLINED,
              },
          ];

    if (cookies.token) headerButtons.push();

    return (
        <>
            <div style={{ position: "fixed", top: 10, right: 10 }}>
                <a
                    href="https://cloud.tchateigne.fr/index.php/s/stKQCqgkg2pFpmk"
                    target="_blank"
                >
                    Voir mon CV
                </a>
            </div>
            <div style={{ width: "80%", margin: "auto", padding: "10px 0" }}>
                {/* <Header buttons={headerButtons} /> */}
                <CenteredDiv style={{ paddingTop: 0 }}>
                    <h1
                        style={{
                            marginBottom: 0,
                            paddingBottom: 0,
                        }}
                    >
                        Bienvenue
                    </h1>
                    <CenteredDiv>
                        sur le site web de Térence Chateigné.
                    </CenteredDiv>
                    <CenteredDiv>
                        Je suis un étudiant en 3ème année à{" "}
                        <a href="https://www.utc.fr" target="_blank">
                            l'Université de Technologie de Compiègne
                        </a>
                        .
                    </CenteredDiv>
                    <CenteredDiv>
                        J'adore tout ce qui a trait à la technologie et souhaite
                        en faire mon métier pour pouvoir construire plein de
                        choses.
                    </CenteredDiv>
                    <h2
                        style={{
                            marginBottom: 0,
                            paddingBottom: 0,
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        Mes passions
                    </h2>
                    <BlockDiv>
                        <StrongDiv>
                            La blockchain et les cryptomonnaies
                        </StrongDiv>
                        <TextDiv>
                            Pouvoir décentraliser le système monétaire et créer
                            un organisme d'échange de valeur (et bien plus
                            encore) fonctionnant grâce à des individus comme
                            vous et moi est grandiose.
                        </TextDiv>
                        <TextDiv>
                            <a href="https://bitcoin.org/fr/" target="_blank">
                                Ah, tu parles du bitcoin ?
                            </a>
                        </TextDiv>
                    </BlockDiv>
                    <BlockDiv>
                        <StrongDiv>La musique</StrongDiv>
                        <TextDiv>
                            J'adore la musique depuis que j'ai découvert
                            l'existence de la pléthore d'artistes plus ou moins
                            connus de la scène post-rock. Je recherche sans
                            relache de nouvelles sonorités, n'hésitant pas à
                            fouiller très très loin.
                        </TextDiv>
                        <TextDiv>
                            <a
                                href="https://www.senscritique.com/liste/Top_10_Albums/1301913"
                                target="_blank"
                            >
                                Mes 10 albums de musique préférés sur
                                SensCritique.com
                            </a>
                        </TextDiv>
                    </BlockDiv>
                    <BlockDiv>
                        <StrongDiv>Les claviers</StrongDiv>
                        <TextDiv>
                            Pour un développeur, taper sur un clavier est devenu
                            la condition sine qua none pour qu'il puisse écrire
                            ses programmes. Le faire sur un clavier adapté est
                            quand même plus agréable. Du coup j'en assemble afin
                            de poursuivre ma quête du clavier parfait (c'est
                            toujours le prochain).
                        </TextDiv>
                        <img
                            width="50%"
                            style={{ margin: "10px 0" }}
                            src="https://cloud.tchateigne.fr/index.php/s/2bDwmjcySFgLMgk/preview"
                        />
                        <div>Ma dernière création.</div>
                    </BlockDiv>
                    <BlockDiv>
                        <StrongDiv>Le tir à l'arc</StrongDiv>
                        <TextDiv>
                            Je pratique ce sport depuis 2017, tirant à l'arc
                            classique et faisant occasionnellement des
                            compétitions. C'est un sport exigeant et qui apprend
                            à se remettre en question. Il faut toujours faire le
                            même mouvement pour tirer au centre du blason, ce
                            qui procure toujours une grande satisfaction.
                        </TextDiv>
                        <img
                            width="50%"
                            style={{ margin: "10px 0" }}
                            src="https://cloud.tchateigne.fr/index.php/s/niw8KF7PN2k28jt/preview"
                        />
                        <div>
                            Moi-même m'apprétant à tirer une flèche lors des
                            championnats de France de tir fédéral à
                            Ruelle-sur-Touvre en 2018.
                        </div>
                    </BlockDiv>
                </CenteredDiv>
            </div>
        </>
    );
};

export default Welcome;
