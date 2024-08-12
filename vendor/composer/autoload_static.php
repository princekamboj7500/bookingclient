<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit7405f1c5dc681ceab4fc8ad8eab5a993
{
    public static $prefixLengthsPsr4 = array (
        'R' => 
        array (
            'Rafcom\\Booking\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Rafcom\\Booking\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit7405f1c5dc681ceab4fc8ad8eab5a993::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit7405f1c5dc681ceab4fc8ad8eab5a993::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit7405f1c5dc681ceab4fc8ad8eab5a993::$classMap;

        }, null, ClassLoader::class);
    }
}
