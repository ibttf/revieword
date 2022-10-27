class EssaySerializer < ActiveModel::Serializer
  attributes :id, :title, :prompt, :length
  has_one :user
  has_one :reviewer
end
