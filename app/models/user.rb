class User < ApplicationRecord
    has_many :essays
    has_many :reviewers, through: :essays
    has_secure_password

    validates :username, presence: true, uniqueness: true
end
