import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanagesImagesTable1602624185567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orphanages_images",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "path",
                    type: "varchar",
                },
                {
                    name: "orphanage_id",
                    type: "integer",
                    unsigned: true,
                },
            ],
            foreignKeys: [
                {
                    name: "ImageOrphanageFK1",
                    columnNames: ["orphanage_id"],
                    referencedTableName: "orphanages",
                    referencedColumnNames: ["id"],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orphanages_images")
    }

}
