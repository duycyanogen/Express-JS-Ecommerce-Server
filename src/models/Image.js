class Image {
    constructor(id, image, imgDetail, idGuitar,isDeleted) {
        this.id = id;
        this.image = image;
        this.imgDetail = imgDetail;
        this.idGuitar = idGuitar;
        this.isDeleted = isDeleted;
    }
}

module.exports = Image;