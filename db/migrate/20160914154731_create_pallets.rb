class CreatePallets < ActiveRecord::Migration[5.0]
  def change
    create_table :pallets, id: :uuid  do |t|
      # relation to which painter
      t.uuid :painter_id

      # pallet image
      t.string :image_url

      # pallet information
      t.string :title
      t.string :description

      # save color informations
      t.integer :colors_count
      t.string :colors

      t.timestamps null: false
    end
  end
end
