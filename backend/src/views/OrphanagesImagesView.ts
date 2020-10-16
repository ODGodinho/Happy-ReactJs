import OrphanageImages from "../Models/OrphanageImages";

export default {
    render(orphanageImages: OrphanageImages) {
        return {
            id: orphanageImages.id,
            url: `${process.env.HOST_LOCATION}/uploads/${orphanageImages.path}`,
        }
    },
    
    renderMany(orphanagesImages: OrphanageImages[]) {
       return orphanagesImages.map((orphanagesImages) => this.render(orphanagesImages));
    }
}