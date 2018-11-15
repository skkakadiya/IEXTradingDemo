package com.iextradingdemo;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Context;
import com.facebook.react.bridge.Promise;
import org.json.JSONException;
import org.json.JSONObject;
import android.widget.Toast;

import com.sanjay.iextradingsdk.IEXTrading;
import com.sanjay.iextradingsdk.Response;


class IEXModule extends ReactContextBaseJavaModule {

    private Context context;

    public IEXModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "IEX";
    }

    @ReactMethod
    public void fetchDetails(final String symbol, final Promise promise) {
        
        IEXTrading iexTrading = new IEXTrading(new Response() {
            @Override
            public void onResponseObtained(String jsonObject) {
                getPrice(symbol, jsonObject, promise);
            }

            @Override
            public void onErrorObatained(String error) {
                promise.reject(error);
            }
        });
        iexTrading.requestCompanyDetail(symbol);
    }

    private void getPrice(String symbol, final String jsonObject, final Promise promise) {
        IEXTrading iexTrading = new IEXTrading(new Response() {
            @Override
            public void onResponseObtained(String json) {
                try{
                    JSONObject jsonTemp = new JSONObject(jsonObject);
                    jsonTemp.put("price", json.replace("\n", ""));
                    promise.resolve(jsonTemp.toString());
                } catch(JSONException e){
                    
                }
            }

            @Override
            public void onErrorObatained(String error) {
                promise.reject(error);
            }
        });
        iexTrading.requestPriceDetail(symbol);
    }

}