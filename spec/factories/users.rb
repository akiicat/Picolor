FactoryGirl.define do
  sequence :name do |n|
    "Cat#{n}"
  end
  sequence :email do |n|
    "email#{n}@example.com"
  end

  factory :user do
    username { generate(:name) }
    email { generate(:email) }
    password "123456"
    password_confirmation "123456"

    factory :user_with_pallets do
      transient do
        pallets_count 5
      end

      after(:create) do |user, evaluator|
        create_list(:pallet, evaluator.pallets_count, user: user)
      end
    end
  end
end
