<?php
// Find booking 29 
$booking = \App\Models\Booking::find(29);
if ($booking && $booking->transaction) {
    $tx = $booking->transaction;
    echo "Found Booking Transaction!\n";
    echo "Original Amount: {$tx->amount}\n";
    $unique = $tx->amount % 1000;
    $base = $tx->amount - $unique;
    $tx->amount = ($base * 1.11) + $unique;
    $tx->save();
    echo "Updated Amount: {$tx->amount}\n";
} else {
    // maybe it is a transaction ID 29?
    $tx = \App\Models\Transaction::find(29);
    if ($tx) {
        echo "Found Transaction 29!\n";
        echo "Original Amount: {$tx->amount}\n";
        $unique = $tx->amount % 1000;
        $base = $tx->amount - $unique;
        $tx->amount = ($base * 1.11) + $unique;
        $tx->save();
        echo "Updated Amount: {$tx->amount}\n";
    } else {
        echo "Neither Booking 29 nor Transaction 29 found.\n";
    }
}
