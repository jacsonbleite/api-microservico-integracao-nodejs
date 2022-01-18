import db from "../db";
import User from "../models/user.model";
import DatabaseError from "../models/errors/database.error.model";

class UserRepository {
  //METÓDO DE CONSULTA
  async findAllUsers(): Promise<User[]> {
    const query = `
        SELECT uuid, username
        FROM application_user
      `;

    const { rows } = await db.query(query);
    return rows || [];
  }

  //CONSULTA USUÁRIO POR ID
  async findById(uuid: string): Promise<User> {
    try {
      const query = `
        SELECT uuid, username
        FROM application_user
        WHERE uuid = $1
    `;
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows; //const user = rows[0]
      return user;
    } catch (error) {
      throw new DatabaseError("Error na consulta por ID", error);
    }
  }

  //CADASTRAR USUÁRIO
  async create(user: User): Promise<string> {
    const insert = `
        INSERT INTO application_user(
            username,
            password
        )
        VALUES($1,crypt($2,'db_slt'))
        RETURNING uuid
      `;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(insert, values);
    const [newUser] = rows;
    return newUser.uuid;
  }

  //ATUALIZAR USUÁRIO
  async update(user: User): Promise<void> {
    const updateScritp = `
        UPDATE application_user
        SET
            username = $1,
            password = crypt($2,'db_slt')
        
        WHERE uuid = $3
       `;

    const values = [user.username, user.password, user.uuid];

    await db.query(updateScritp, values);
  }

  async remove(uuid: string): Promise<void> {
    const removeScritp = `
        DELETE
        FROM application_user
        WHERE uuid = $1
    `;
    const values = [uuid];

    await db.query(removeScritp, values);
  }

  async findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User | null> {
    try {
      const query = `
      SELECT uuid, username
      FROM application_user
      WHERE username = $1
      AND password = crypt($2,'db_slt')
    `;
      const values = [username, password];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;
      return user || null;
    } catch (error) {
      throw new DatabaseError("Usuário não encontrado!", error);
    }
  }
}

export default new UserRepository();
