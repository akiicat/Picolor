require "rails_helper"

RSpec.describe PalletsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/pallets").to route_to("pallets#index")
    end

    it "routes to #new" do
      expect(:get => "/pallets/new").to route_to("pallets#new")
    end

    it "routes to #show" do
      expect(:get => "/pallets/1").to route_to("pallets#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/pallets/1/edit").to route_to("pallets#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/pallets").to route_to("pallets#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/pallets/1").to route_to("pallets#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/pallets/1").to route_to("pallets#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/pallets/1").to route_to("pallets#destroy", :id => "1")
    end
  end
end
