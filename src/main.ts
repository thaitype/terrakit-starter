import { App } from "cdktf";
import { createMyStack } from "./MyStack";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

const app = new App();
const myStack = createMyStack(app, {
  identifier: {
    env: 'prod',
    slot: 'prod',
    site: 'active'
  },
  providers: {
    defaultAzureProvider: (scope) => new AzurermProvider(scope, "azurerm_provider_default", {
      // skipProviderRegistration: true,
      resourceProviderRegistrations: 'core',
      subscriptionId: '00000000-0000-0000-0000-000000000000',
      features: [{}]
    })
  },
})
  .overrideResources({
    aaa1: {
      name: 'custom-rg'
    }
  })
  .build();


app.synth();

