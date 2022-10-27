class EssaySerializer < ActiveModel::Serializer
  attributes :id, :title, :prompt
  has_one :user
  has_one :reviewer
end
