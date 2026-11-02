<?php
declare(strict_types=1);

return [
    'database' => [
        // Use the exact host, database name and account shown by your hosting provider.
        'dsn' => 'mysql:host=localhost;dbname=REPLACE_DATABASE;charset=utf8mb4',
        'username' => 'REPLACE_USERNAME',
        'password' => 'REPLACE_PASSWORD',
    ],
    'allowed_origins' => [
        'https://www.stefanochiabrando.com',
    ],
    'email' => [
        'to' => 'mail@stefanochiabrando.com',
        'from' => 'mail@stefanochiabrando.com',
    ],
    'session' => [
        'secure_cookie' => true,
    ],
    'rate_limit' => [
        'directory' => __DIR__ . '/storage',
        // Generate a fresh random value of at least 32 characters for the real config.
        'salt' => 'REPLACE_WITH_A_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS',
    ],
];
