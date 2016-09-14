FactoryGirl.define do
  sequence :title do |n|
    "Title#{n}"
  end

  factory :pallet do
    title { generate(:title) }
    description "the description of this pallet."
    colors_count 10
    colors "#000000"
    user
  end
end
