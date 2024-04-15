import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase('banco.db'),
}

//abrir a base de dados para utilizar
//ele cria um banco com o nome ('meubanco.db') caso não haja uma
