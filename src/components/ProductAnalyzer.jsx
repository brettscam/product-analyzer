import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, Baby } from 'lucide-react';

const ProductAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
