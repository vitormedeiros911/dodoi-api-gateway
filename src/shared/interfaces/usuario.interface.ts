import { PerfilEnum } from '../enum/perfil.enum';
import { StatusEnum } from '../enum/status.enum';

export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  urlImagem: string;
  idFarmacia: string;
  perfis: PerfilEnum[];
  status: StatusEnum;
}
