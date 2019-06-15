export interface MyData {
    id: any,
    object: Object
}
export interface MyArtist {
	id: any,
	name: string
}
export interface MyAlbum {
	id:any,
	name: string,
	artistName:string,
	artistId:any
}
export interface MySong {
	id:any,
	name:string,
	slug:string,
	artistId:any,
	albumId:any,
	albumName:string,
	artistName:string
}
export interface MyPlaylist {
	id: any,
	name: string,
	songs: any
}