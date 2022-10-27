class CreateEssays < ActiveRecord::Migration[6.1]
  def change
    create_table :essays do |t|
      t.text :content
      t.text :prompt
      t.text :tone_comments
      t.text :flow_comments
      t.text :overall_comments
      t.string :length
    
      t.boolean :is_reviewed
      t.references :user, null: false, foreign_key: true
      t.references :reviewer, references: :users, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
