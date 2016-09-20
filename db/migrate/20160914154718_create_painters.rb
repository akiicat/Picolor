class CreatePainters < ActiveRecord::Migration[5.0]
  def change
    create_table :painters, id: :uuid  do |t|
      # username
      t.string :username

      t.timestamps null: false
    end
  end
end
