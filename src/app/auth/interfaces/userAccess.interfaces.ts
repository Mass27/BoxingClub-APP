// Generated by https://quicktype.io

export interface LoginAccess {
  permisos:      Permisos;
  _id:           string;
  usuarioLogin?: string;
  descripcion:   string;
  estado:        string;
  createdAt:     string;
  updatedAt:     string;
  __v:           number;
}

export interface Permisos {
  editar:   boolean;
  eliminar: boolean;
  crear:    boolean;
  listar:   boolean;
}