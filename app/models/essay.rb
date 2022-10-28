class Essay < ApplicationRecord
    belongs_to :user
    belongs_to :reviewer, class_name: :User, optional: true


    validates :content, presence: true, length: {minimum: 120}
    validates :prompt, presence: true, length: {minimum: 10}

end
