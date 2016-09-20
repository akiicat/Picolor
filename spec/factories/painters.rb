FactoryGirl.define do
  sequence :name do |n|
    "Cat#{n}"
  end
  sequence :email do |n|
    "email#{n}@example.com"
  end

  factory :painter do
    username { generate(:name) }
    email { generate(:email) }
    password "123456"
    password_confirmation "123456"

    factory :painter_with_pallets do
      transient do
        pallets_count 5
      end

      after(:create) do |painter, evaluator|
        create_list(:pallet, evaluator.pallets_count, painter: painter)
      end
    end
  end

end
