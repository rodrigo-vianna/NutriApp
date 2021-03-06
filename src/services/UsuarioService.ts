import FirebaseService from "../db/Firebase";
import Usuario from "../models/Usuario";

export default class UsuarioService extends FirebaseService<Usuario> {
	constructor() {
		super("usuarios");
	}

	registrarUsuario(novoId: string, antigoUsuario: Usuario) {
		const novoUsuario: Usuario = {
			nome: antigoUsuario.nome,
			email: antigoUsuario.email,
			tipo: antigoUsuario.tipo,
			createdAt: antigoUsuario.createdAt,
			sexo: antigoUsuario.sexo,
		};
		if (antigoUsuario.dataNascimento) {
			novoUsuario.dataNascimento = antigoUsuario.dataNascimento;
		}
		return this.getCollectionRef()
			.doc(novoId)
			.set(novoUsuario, { merge: true })
			.then(async (id) => {
				await this.getCollectionRef().doc(antigoUsuario.id!).delete();
				return id;
			});
	}

	getUsuarioPorEmail(email: string) {
		return this.getCollectionRef()
			.where("email", "==", email)
			.get()
			.then((doc) => {
				if (doc.empty) return undefined;
				return doc.docs[0].data();
			});
	}

	listar() {
		return this.getCollectionRef()
			.get()
			.then((query) => query.docs.map((item) => item.data()));
	}
}
