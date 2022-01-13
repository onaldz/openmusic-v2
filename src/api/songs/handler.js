const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  // async postSongHandler(request, h) {
  //   try {
  //     this._validator.validateSongPayload(request.payload);
  //     const {
  //       title = 'untitled', year, performer, genre, duration,
  //     } = request.payload;
  //     const { id: credentialId } = request.auth.credentials;

  //     const songId = await this._service.addSong({
  //       title, year, performer, genre, duration, owner: credentialId,
  //     });

  //     const response = h.response({
  //       status: 'success',
  //       message: 'Lagu berhasil ditambahkan',
  //       data: {
  //         songId,
  //       },
  //     });
  //     response.code(201);
  //     return response;
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }

  //     // Server ERROR!
  //     const response = h.response({
  //       status: 'error',
  //       message: 'Maaf, terjadi kegagalan pada server kami.',
  //     });
  //     response.code(500);
  //     console.error(error);
  //     return response;
  //   }
  // }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(request.payload);

    const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
            songId,
        },
    });

    response.code(201);
    return response;
}

  // async getSongsHandler(request) {
  //   const { id: credentialId } = request.auth.credentials;
  //   const songs = await this._service.getSongs(credentialId);
  //   return {
  //     status: 'success',
  //     data: {
  //       songs,
  //     },
  //   };
  // }

  async getSongsHandler() {
    const songs = await this._service.getSongs();
    return {
        status: 'success',

        data: {
            songs,
        },
    };
}

  // async getSongByIdHandler(request, h) {
  //   try {
  //     const { id } = request.params;
  //     const { id: credentialId } = request.auth.credentials;

  //     await this._service.verifySongOwner(id, credentialId);
  //     const song = await this._service.getSongById(id);
  //     return {
  //       status: 'success',
  //       data: {
  //         song,
  //       },
  //     };
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }

  //     // Server ERROR!
  //     const response = h.response({
  //       status: 'error',
  //       message: 'Maaf, terjadi kegagalan pada server kami.',
  //     });
  //     response.code(500);
  //     console.error(error);
  //     return response;
  //   }
  // }

  // get song by id
  async getSongByIdHandler(request) {
    // try {
        const { id } = request.params;
        const song = await this._service.getSongById(id);
        return {
            status: 'success',
            data: {
                song,
            },
        };
    }

  // async putSongByIdHandler(request, h) {
  //   try {
  //     this._validator.validateSongPayload(request.payload);
  //     const { id } = request.params;
  //     const { id: credentialId } = request.auth.credentials;

  //     await this._service.verifySongOwner(id, credentialId);
  //     await this._service.editSongById(id, request.payload);

  //     return {
  //       status: 'success',
  //       message: 'Lagu berhasil diperbarui',
  //     };
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }

  //     // Server ERROR!
  //     const response = h.response({
  //       status: 'error',
  //       message: 'Maaf, terjadi kegagalan pada server kami.',
  //     });
  //     response.code(500);
  //     console.error(error);
  //     return response;
  //   }
  // }

  // put song by id
  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const {
        title, year, performer, genre, duration,
    } = request.payload;
    const { id } = request.params;

    // await this._service.editSongById(id, request.payload);
    await this._service.editSongById(id, {
        title,
        year,
        performer,
        genre,
        duration,
    });

    return {
        status: 'success',
        message: 'Lagu berhasil diperbarui',
    };
}

  // async deleteSongByIdHandler(request, h) {
  //   try {
  //     const { id } = request.params;
  //     const { id: credentialId } = request.auth.credentials;

  //     await this._service.verifySongOwner(id, credentialId);
  //     await this._service.deleteSongById(id);

  //     return {
  //       status: 'success',
  //       message: 'Lagu berhasil dihapus',
  //     };
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }

  //     // Server ERROR!
  //     const response = h.response({
  //       status: 'error',
  //       message: 'Maaf, terjadi kegagalan pada server kami.',
  //     });
  //     response.code(500);
  //     console.error(error);
  //     return response;
  //   }
  // }

  // delete song
  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
    };
}
}

module.exports = SongsHandler;
