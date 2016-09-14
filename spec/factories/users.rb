FactoryGirl.define do
  sequence :name do |n|
    "Cat#{n}"
  end

  factory :user do
    name { generate(:name) }

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
