<?php

namespace Rafcom\Booking\Providers;

use Illuminate\Support\ServiceProvider;

class PackageServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Load routes
        $this->loadRoutesFrom(__DIR__.'/../routes/web.php');

        // Load views
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'booking');

        // Publish config
        $this->publishes([
            __DIR__.'/../config/package.php' => config_path('package.php'),
        ]);
    }

    public function register()
    {
        // Merge config
        $this->mergeConfigFrom(
            __DIR__.'/../config/package.php', 'booking'
        );
    }
}
