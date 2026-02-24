<?php
$file = 'd:/Herd/newindepth/resources/js/Pages/Affiliate/Partials/AffiliateAgreementContent.jsx';
$content = file_get_contents($file);

// Add explicit classes to <ol>
$content = str_replace('<ol className="list-decimal pl-5 space-y-2 text-sm">', '<ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">', $content);
$content = str_replace('<ol className="list-decimal pl-5 space-y-1 text-sm">', '<ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 font-medium">', $content);

// Add explicit classes to <p>
$content = str_replace('<p className="text-sm">', '<p className="text-sm text-slate-700 dark:text-slate-300 font-medium">', $content);
$content = str_replace('<p className="italic underline underline-offset-4 decoration-indigo-200 dark:decoration-indigo-800/50">', '<p className="italic underline underline-offset-4 decoration-indigo-200 dark:decoration-indigo-800/50 text-slate-700 dark:text-slate-300 font-medium">', $content);

file_put_contents($file, $content);
echo "Done!";
