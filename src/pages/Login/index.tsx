import {
	IonButton,
	IonContent,
	IonImg,
	IonInput,
	IonLoading,
	IonPage,
	IonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useAuth } from "../../context/auth";
import "./index.css";

const Login: React.FC<RouteComponentProps> = (props) => {
	const { auth, login } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [mensagemErrorBox, setMensagemErrorBox] = useState<string>("");
	const [showErrorBox, setShowErrorBox] = useState<boolean>(false);

	const [showLoading, setShowLoading] = useState<boolean>(false);

	const mostrarMensagemErro = (mensagem: string) => {
		setMensagemErrorBox(mensagem);
		setShowErrorBox(true);
	};

	const doLogin = async () => {
		setShowLoading(true);
		await login(email, password)
			.then((authUser) => {
				if (!authUser.user) {
					mostrarMensagemErro("Não foi possível logar usuário.");
					return;
				}
				props.history.replace("/private/home");
			})
			.catch((error) => {
				console.error(error);
				mostrarMensagemErro(error.message);
				setShowLoading(false);
			});
	};

	useEffect(() => {
		if (auth?.user?.id) {
			props.history.replace("/private/home");
		}
	}, [auth?.user?.id, props.history]);

	return (
		<IonPage className="ion-padding a-s-d">
			<IonImg className="i-l" />
			<IonContent scrollY={false} className="ion-padding c-f-l">
				<IonLoading
					isOpen={showLoading}
					onDidDismiss={() => setShowLoading(false)}
				/>
				<IonToast
					isOpen={showErrorBox}
					onDidDismiss={() => setShowErrorBox(false)}
					message={mensagemErrorBox}
					duration={1000}
					position="top"
					color="danger"
				/>
				<IonInput
					placeholder="E-mail"
					type="email"
					autocorrect="off"
					onIonChange={(e: any) => setEmail(e.target.value)}
					className="i-s-l"
				/>
				<IonInput
					placeholder="Senha"
					type="password"
					onIonChange={(e: any) => setPassword(e.target.value)}
					className="i-s-l"
				/>

				<IonButton className="l-b-s" expand="block" onClick={doLogin}>
					Login
				</IonButton>

				<IonButton className="f-a-b-s" routerLink="/primeiro-acesso">
					Primeiro acesso?
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Login;
