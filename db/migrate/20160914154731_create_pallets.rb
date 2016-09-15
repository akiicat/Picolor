class CreatePallets < ActiveRecord::Migration[5.0]
  def change
    create_table :pallets, id: :uuid  do |t|
      # relation to which user
      t.uuid :user_id

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